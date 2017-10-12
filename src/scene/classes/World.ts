//import log from '../tools/log';
import * as BABYLON from 'babylonjs';
import DataModel from '../../data-model';
import setControlls from '../set-controlls';
import {PLAYER} from '../../config';
import {default as AbstractSpell, spellPhases} from '../../spells/classes/AbstractSpell';
import spellFactory from '../../spells/classes/SpellFactory';
import {neighbourSpell} from '../../spells/tools/index';
import MaterialFactory from "./../classes/MaterialFactory";
import WorldGenerator from "../../generator";
import * as _ from "lodash";


//todo split to smaller classes
export default class World{

    public engine:BABYLON.Engine;
    public scene:BABYLON.Scene;
    public materialFactory:MaterialFactory;
    public worldGenerator:WorldGenerator;
    public playerMesh:BABYLON.AbstractMesh;
    public groundMesh:BABYLON.AbstractMesh;
    public skyboxMesh:BABYLON.AbstractMesh;


    constructor(
        public canvasElement: HTMLCanvasElement,
        public dataModel:DataModel
    ) {
        this.createScene(true);
    }


    get playerDirection():BABYLON.Vector3{
        const point1 = this.playerMesh.position;
        const point2 = this.scene.pick(this.canvasElement.width / 2, this.canvasElement.height / 2, (mesh)=>mesh === this.skyboxMesh).pickedPoint;

        return point2.subtract(point1);
    }

    get playerDirection1():BABYLON.Vector3{
        const playerDirection = this.playerDirection;
        return playerDirection.scale(1/playerDirection.length());
    }


    get playerRotationY():number{
        //todo Is thare a simple and better solution how to count camera rotation after world load than picking?
        //eg. const cameraRotation = Math.PI/2 - camera.rotation.y;
        const playerDirection = this.playerDirection;
        return Math.atan2(playerDirection.z,playerDirection.x);
    }


    createScene(runWorldGenerator=false){

        this.engine = new BABYLON.Engine(this.canvasElement, true);

        const updateFps = _.throttle(()=>{
            this.dataModel.stat.fps = this.engine.getFps();
            this.dataModel.stat.meshes = this.scene.meshes.length;
        },200);

        this.engine.runRenderLoop(()=>{
            this.scene.render();
            updateFps();
        });

        window.addEventListener("resize", ()=>{
            this.engine.resize();
        });


        this.scene = new BABYLON.Scene(this.engine);
        this.materialFactory = new MaterialFactory(this.scene);
        this.scene.clearColor = new BABYLON.Color4(1, 0, 0, 0);


        const camera = new BABYLON.FreeCamera("FreeCamera", BABYLON.Vector3.Zero(),  this.scene);
        camera.fov = 1.2;

        const light1 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(1, -2, 1), this.scene);
        light1.position = new BABYLON.Vector3(20, 3, 20);
        light1.intensity = 0.7;

        const gravityVector = new BABYLON.Vector3(0,-100, 0);
        const physicsPlugin = new BABYLON.OimoJSPlugin()
        this.scene.enablePhysics(gravityVector, physicsPlugin);


        this.playerMesh = BABYLON.Mesh.CreateSphere("player", 16,1, this.scene);
        this.playerMesh.isVisible = false;
        this.playerMesh.position =  new BABYLON.Vector3(0, 2, 0);
        this.playerMesh.rotation =  new BABYLON.Vector3(0, 0, 0);
        this.playerMesh.scaling =  new BABYLON.Vector3(1, 4, 1);
        this.playerMesh.physicsImpostor = new BABYLON.PhysicsImpostor(this.playerMesh, BABYLON.PhysicsImpostor.SphereImpostor, {
            mass: 1,
            restitution: 0.01,
            friction: 100
        }, this.scene);


        this.worldGenerator = new WorldGenerator(this.playerMesh,this.materialFactory,this.dataModel,this.scene);


        //todo Is thare better solution for angular friction?
        this.playerMesh.physicsImpostor.registerAfterPhysicsStep(()=>{
            camera.position =  this.playerMesh.position;
            this.playerMesh.physicsImpostor.setAngularVelocity(BABYLON.Vector3.Zero());
        });


        this.scene.registerAfterRender(()=>{
            this.scene.meshes.forEach((mesh)=> {
                if ('physicsImpostor' in mesh) {
                    if (mesh.position.y < 0) {
                        mesh.physicsImpostor.sleep();
                        mesh.position = new BABYLON.Vector3(
                            mesh.position.x,
                            0,
                            mesh.position.z
                        );
                        mesh.physicsImpostor.wakeUp();
                    }
                }
                ;
            });
        });


        const onPointerDown = ()=>{
            //todo only left button ???maybe on spell?

            try {
                spell.addTarget(pickFromCenter());
            } catch (error) {
                //todo catch only SpellError extended from Error
                this.dataModel.sendMessage(error.message as string);
            }

        }


        const cameraRotationXLimitMin = Math.PI * -.5*.9,
              cameraRotationXLimitMax = Math.PI * 0.5*.9;

        setControlls(
            this.canvasElement
            ,onPointerDown
            ,(alpha:number,beta:number)=>{
                camera.rotation.x += alpha;
                camera.rotation.y += beta;
                if(camera.rotation.x<cameraRotationXLimitMin)camera.rotation.x=cameraRotationXLimitMin;
                if(camera.rotation.x>cameraRotationXLimitMax)camera.rotation.x=cameraRotationXLimitMax;
            }
            ,(vector:BABYLON.Vector3)=>{
                const currentVelocity = this.playerMesh.physicsImpostor.getLinearVelocity();

                //todo Jumping on flying object
                const onGround = currentVelocity.y<1;//playerMesh.position.y<=2;

                const distance = Math.sqrt(Math.pow(vector.x,2)+Math.pow(vector.z,2));
                const rotation = Math.atan2(vector.z,vector.x)+this.playerRotationY;


                const rotatedVector = new BABYLON.Vector3(
                    Math.cos(rotation)*distance,
                    onGround?vector.y:0,
                    Math.sin(rotation)*distance
                );

                const composedVelocity = currentVelocity.add(rotatedVector);
                const jumpVelocity = new BABYLON.Vector3(0,composedVelocity.y,0);
                const surfaceVelocity = new BABYLON.Vector3(composedVelocity.x,0,composedVelocity.z);

                const surfaceVelocityLength = surfaceVelocity.length();
                if(surfaceVelocityLength>PLAYER.SPEED.TERMINAL){
                    surfaceVelocity.scaleInPlace(PLAYER.SPEED.TERMINAL/surfaceVelocityLength);
                }

                const composedVelocityTerminated = surfaceVelocity.add(jumpVelocity);

                this.playerMesh.physicsImpostor.setLinearVelocity(composedVelocityTerminated);



            },
            this.dataModel
        );







        this.skyboxMesh = BABYLON.Mesh.CreateBox("skyBox", 1000, this.scene);
        const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(process.env.PUBLIC_URL +"/assets/skyboxes/TropicalSunnyDay/TropicalSunnyDay", this.scene, ["_ft.jpg", "_up.jpg", "_rt.jpg", "_bk.jpg", "_dn.jpg", "_lf.jpg"]);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.disableLighting = true;
        this.skyboxMesh.material = skyboxMaterial;






        this.groundMesh = BABYLON.Mesh.CreateGround("ground", 1000, 1000, 2, this.scene);
        this.groundMesh.material = this.materialFactory.getMaterial('grass',100);
        this.groundMesh.physicsImpostor = new BABYLON.PhysicsImpostor(this.groundMesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.1}, this.scene);
        this.scene.registerBeforeRender(()=>{

            this.skyboxMesh.position = this.playerMesh.position;

            this.groundMesh.position.x = this.playerMesh.position.x;
            this.groundMesh.position.z = this.playerMesh.position.z;

            ((this.groundMesh.material as BABYLON.StandardMaterial).diffuseTexture as BABYLON.Texture).uOffset = this.groundMesh.position.x/10;
            ((this.groundMesh.material as BABYLON.StandardMaterial).diffuseTexture as BABYLON.Texture).vOffset = this.groundMesh.position.z/10;

        });


        if(runWorldGenerator){
            this.worldGenerator.generateWorld();
        }




        const pickFromCenter = ()=>{
            return this.scene.pick(this.canvasElement.width / 2, this.canvasElement.height / 2, (mesh)=>{
                return mesh !== this.playerMesh /*&& mesh !== groundMesh*/ && 'physicsImpostor' in mesh;
            });
        }



        const allSpells:AbstractSpell[] = [];
        let lastTick = performance.now();
        this.scene.registerBeforeRender(()=>{
            const thisTick = performance.now();
            const tickDuration = thisTick - lastTick;
            lastTick = thisTick;

            //todo garbage collector
            allSpells.forEach((spell:AbstractSpell)=>{
                if(spell.phase===spellPhases.EXECUTING) {
                    spell.tick(tickDuration);
                }
            });

        });

        let spell:AbstractSpell;
        const createNewSpell = ()=>{

            if(!(spell||{released:true}/*todo better*/).released) {
                spell.release();
            }else {
                spell = spellFactory.createSpell(
                    this.dataModel.currentSpellId,
                    (energyCost: number) => {
                        /*todo survival mode
                        if (energyCost > dataModel.energy) {
                            throw new Error('Not enough resources.');
                        }
                        dataModel.energy -= energyCost;
                        return true;*/
                    },
                    (energyGain: number) => {
                    },
                    [],//todo other player spells
                    this
                );

                /*spell.subscribe(() => {
                    //console.log('spell.subscribe', spell.phase);
                    switch (spell.phase) {
                        case spellPhases.EXECUTING:
                            break;
                        case spellPhases.FINISHED:
                            //todo remove from executingSpells
                            break;
                    }
                });*/

                spell.subscribeOnRelease(() => {
                    createNewSpell();
                });

                allSpells.push(spell);
            }
        }
        createNewSpell();




        //todo lodash debounce
        const onWheel = (event:WheelEvent)=>{
            if(event.deltaY>0){
                this.dataModel.currentSpellId = neighbourSpell(this.dataModel.currentSpellId,1);
                createNewSpell();
            }else
            if(event.deltaY<0){
                this.dataModel.currentSpellId = neighbourSpell(this.dataModel.currentSpellId,-1);
                createNewSpell();
            }
        }
        this.canvasElement.addEventListener("wheel", onWheel, false);


        this.scene.onDispose = ()=>{

            const old_element = this.canvasElement;
            const new_element = old_element.cloneNode(true);
            (old_element.parentNode as any).replaceChild(new_element, old_element);
            this.canvasElement = new_element as HTMLCanvasElement;

        };

        /*BABYLON.SceneOptimizer.OptimizeAsync(this.scene, BABYLON.SceneOptimizerOptions.ModerateDegradationAllowed(),
            function() {
                // On success
            }, function() {
                // FPS target not reached
            })*/

    }

    get meshes():BABYLON.AbstractMesh[]{

            return this.scene.meshes.filter((mesh)=>(
                mesh!==this.playerMesh&&
                mesh!==this.groundMesh&&
                mesh!==this.skyboxMesh&&
                mesh.material instanceof BABYLON.StandardMaterial &&
                mesh.physicsImpostor instanceof BABYLON.PhysicsImpostor
            ));
    }

    cleanScene(){

        (this.scene.activeCamera as BABYLON.FreeCamera).rotation.y = 0;
        this.engine.dispose();
        this.createScene();
    }

}
