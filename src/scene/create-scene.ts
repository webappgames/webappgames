//import log from '../tools/log';
import * as BABYLON from 'babylonjs';
import DataModel from '../data-model';
//import createStairs from './create-stairs';
//import injectObjectPicking from './inject-object-picking';
import setControlls from './set-controlls';
import {PLAYER} from '../config';
import {default as AbstractSpell, spellPhases} from '../spells/classes/AbstractSpell';
import spellFactory from '../spells/classes/SpellFactory';
import {neighbourSpell} from '../spells/tools/index';
//import {subscribeKeys,SubscriberModes} from '../tools/keys';
import MaterialFactory from "./classes/MaterialFactory";
import WorldGenerator from "../generator";




export default function createScene(canvasElement: HTMLCanvasElement, engine: BABYLON.Engine,dataModel:DataModel): BABYLON.Scene {
    const scene = new BABYLON.Scene(engine);

    const materialFactory = new MaterialFactory(scene);


    scene.clearColor = new BABYLON.Color4(1, 0, 0, 0);


    //scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    //BABYLON.Scene.FOGMODE_NONE;
    //BABYLON.Scene.FOGMODE_EXP;
    //BABYLON.Scene.FOGMODE_EXP2;
    //BABYLON.Scene.FOGMODE_LINEAR;
    //scene.fogColor = BABYLON.Color3.FromHexString('#ffffff');
    //scene.fogDensity = 0.01;
    //scene.fogStart = 20.0;
    //scene.fogEnd = 1000;



    const camera = new BABYLON.FreeCamera("FreeCamera", BABYLON.Vector3.Zero(),  scene);
    camera.fov = 1.2;




    const light1 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(1, -2, 1), scene);
    light1.position = new BABYLON.Vector3(20, 3, 20);
    light1.intensity = 0.7;









    const gravityVector = new BABYLON.Vector3(0,-100, 0);
    //const physicsPlugin = new BABYLON.CannonJSPlugin();
    const physicsPlugin = new BABYLON.OimoJSPlugin()
    scene.enablePhysics(gravityVector, physicsPlugin);
    //scene.enablePhysics();





    const playerMesh = BABYLON.Mesh.CreateSphere("box", 16,1, scene);
    //todo isVisible playerMesh.visibility = 0;
    //playerMesh.showBoundingBox = true;
    playerMesh.isVisible = false;
    playerMesh.position =  new BABYLON.Vector3(0, 2, 0);
    playerMesh.rotation =  new BABYLON.Vector3(0, /*Math.PI/16*/0, 0);
    playerMesh.scaling =  new BABYLON.Vector3(1, 4, 1);
    //playerMesh.material = getMaterial('grass', 1, scene);
    playerMesh.physicsImpostor = new BABYLON.PhysicsImpostor(playerMesh, BABYLON.PhysicsImpostor.SphereImpostor, {
        mass: 1,
        restitution: 0.01,
        friction: 100
    }, scene);


    const worldGenerator = new WorldGenerator(playerMesh,materialFactory,scene);



    camera.position =  playerMesh.position;
    //todo Is thare better solution for angular friction?
    playerMesh.physicsImpostor.registerBeforePhysicsStep(()=>{
        //const angularVelocity = playerMesh.physicsImpostor.getAngularVelocity();
        //playerMesh.physicsImpostor.setAngularVelocity(angularVelocity.scale(.5));
        playerMesh.physicsImpostor.setAngularVelocity(BABYLON.Vector3.Zero());


        /*console.log(playerMesh.position.y);
        if(playerMesh.position.y<10){
            //playerMesh.physicsImpostor.setLinearVelocity(BABYLON.Vector3.Zero());
            playerMesh.position.y = 10;
        }*/


        //todo Prevent fell through the ground. - maybe decrease life
        /*if(playerMesh.position.y>2/*todo count from playerMesh size* /){
            console.log(playerMesh.position.y);
            playerMesh.position.y = 20;
            playerMesh.physicsImpostor.setLinearVelocity(BABYLON.Vector3.Zero());
        }*/

    });



    //camera.parent = playerMesh;
    setControlls(
            canvasElement
            ,onPointerDown
            ,(alpha:number,beta:number)=>{

                camera.rotation.x += alpha;
                camera.rotation.y += beta;

            }
            ,(vector:BABYLON.Vector3)=>{


                const currentVelocity = playerMesh.physicsImpostor.getLinearVelocity();

                //todo Jumping on flying object
                const onGround = currentVelocity.y<1;//playerMesh.position.y<=2;

                const cameraDirection = camera.getDirection(new BABYLON.Vector3(1,1,1));
                const cameraRotation = Math.atan2(cameraDirection.z,cameraDirection.x);


                const distance = Math.sqrt(Math.pow(vector.x,2)+Math.pow(vector.z,2));
                const rotation = Math.atan2(vector.z,vector.x)+cameraRotation+Math.PI/4;


                const rotatedVector = new BABYLON.Vector3(
                    Math.cos(rotation)*distance,
                    onGround?vector.y:0,
                    Math.sin(rotation)*distance
                );




                const composedVelocity = currentVelocity.add(rotatedVector);
                PLAYER;

                const jumpVelocity = new BABYLON.Vector3(0,composedVelocity.y,0);
                const surfaceVelocity = new BABYLON.Vector3(composedVelocity.x,0,composedVelocity.z);

                const surfaceVelocityLength = surfaceVelocity.length();
                if(surfaceVelocityLength>PLAYER.SPEED.TERMINAL){
                    surfaceVelocity.scaleInPlace(PLAYER.SPEED.TERMINAL/surfaceVelocityLength);
                }

                const composedVelocityTerminated = surfaceVelocity.add(jumpVelocity);

                playerMesh.physicsImpostor.setLinearVelocity(composedVelocityTerminated);



            }
        );







    const skybox = BABYLON.Mesh.CreateBox("skyBox", 1000, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("/assets/skyboxes/TropicalSunnyDay/TropicalSunnyDay", scene, ["_ft.jpg", "_up.jpg", "_rt.jpg", "_bk.jpg", "_dn.jpg", "_lf.jpg"]);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
    skybox.position = playerMesh.position;






    const groundMesh = BABYLON.Mesh.CreateGround("ground", 1000, 1000, 2, scene);
    groundMesh.material = materialFactory.getMaterial('grass',100);
    groundMesh.physicsImpostor = new BABYLON.PhysicsImpostor(groundMesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.1}, scene);
    scene.registerBeforeRender(()=>{
        groundMesh.position.x = playerMesh.position.x;
        groundMesh.position.z = playerMesh.position.z;

        ((groundMesh.material as BABYLON.StandardMaterial).diffuseTexture as BABYLON.Texture).uOffset = groundMesh.position.x/10;
        ((groundMesh.material as BABYLON.StandardMaterial).diffuseTexture as BABYLON.Texture).vOffset = groundMesh.position.z/10;



    });






    /*const stairsMesh = createStairs(scene, 50);
    stairsMesh.position.y = -0.5;



    const building = BABYLON.Mesh.CreateBox("box", 50, scene);
    building.position.y = -0.5;
    building.position.x = 75;
    building.checkCollisions = true;
    building.material = getMaterial('stone-plain',scene);*/



    /*for(let i=0;i<100;i++){
        const boxMesh = BABYLON.Mesh.CreateBox("box", 4, scene);
        boxMesh.position.y = Math.random()*20;
        boxMesh.position.x = (Math.random()-0.5)*100;
        boxMesh.position.z = (Math.random()-0.5)*100;
        boxMesh.rotation.y = Math.random()*Math.PI*2;

        boxMesh.rotation.x = Math.random()*Math.PI*2/20;
        boxMesh.rotation.z = Math.random()*Math.PI*2/20;
        boxMesh.checkCollisions = true;
        boxMesh.material = getMaterial('stone-plain',scene);


        boxMesh.physicsImpostor = new BABYLON.PhysicsImpostor(boxMesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
    }*/




    /*for(let y=0;y<3;y++) {
        for (let x = 0; x < 3; x++) {
            for (let i = 0; i < 50; i++) {
                const boxMesh = BABYLON.Mesh.CreateBox("box", 4, scene);
                boxMesh.position.y = i * 4 + 1;
                boxMesh.position.x = (x-5) * 4;
                boxMesh.position.z = (y-5) * 4;
                //boxMesh.checkCollisions = true;
                boxMesh.material = getMaterial('stone-plain', 1, scene);


                boxMesh.physicsImpostor = new BABYLON.PhysicsImpostor(boxMesh, BABYLON.PhysicsImpostor.BoxImpostor, {
                    mass: 10,
                    restitution: 0.2
                }, scene);





            }
        }
    }*/


    worldGenerator.generateWorld();


    //injectObjectPicking(scene,canvasElement,groundMesh);

    /*camera.onCollide = function (collidedMesh: any) {
    };*/




    function pickFromCenter():BABYLON.PickingInfo{
        return scene.pick(canvasElement.width / 2, canvasElement.height / 2, (mesh)=>{
            return mesh !== playerMesh /*&& mesh !== groundMesh*/ && 'physicsImpostor' in mesh;
        });
    }




    //todo optimize
    //let spell:AbstractSpell|null = null;
    //spellId, distance
    //let aimedMeshLast:BABYLON.AbstractMesh|null = null;
    /*scene.registerBeforeRender(()=>{

        const pickInfo = pickFromCenter();

        if (pickInfo.hit) {
            //if(pickInfo.pickedMesh!==aimedMeshLast){
                //aimedMeshLast = pickInfo.pickedMesh;


            const spell = spellFactory.createSpell(
                dataModel.currentSpellId,
                pickInfo.pickedMesh,
                pickInfo.pickedPoint,
                playerMesh,
                scene
            );

            if(spell.acceptTargetMesh()){


                dataModel.aimed = true;
                dataModel.aimedEnergyCost = spell.countEnergyCost();
                dataModel.aimedMessage = spell.message;

            }else{

                dataModel.aimed = false;
                dataModel.aimedEnergyCost = NaN;
                dataModel.aimedMessage = '';


            }



            //}

        }else{
            dataModel.aimed = false;
            dataModel.aimedEnergyCost = NaN;
            dataModel.aimedMessage = '';
            //aimedMeshLast = null;
            //spell = null;
        }

    });*/


    const allSpells:AbstractSpell[] = [];
    let lastTick = performance.now();
    scene.registerBeforeRender(()=>{
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
    function createNewSpell():void {

        if(!(spell||{released:true}/*todo better*/).released) {
            spell.release();
        }else {
            spell = spellFactory.createSpell(
                dataModel.currentSpellId,
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
                [],
                playerMesh,
                //groundMesh,
                materialFactory,
                scene
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


    function onPointerDown() {
        //todo only left button ???maybe on spell?

        try {
            spell.addTarget(pickFromCenter());
        } catch (error) {
            //todo catch only SpellError extended from Error
            dataModel.sendMessage(error.message as string);
        }

    }


    //todo lodash debounce
    function onWheel(event:WheelEvent) {
        if(event.deltaY>0){
            dataModel.currentSpellId = neighbourSpell(dataModel.currentSpellId,1);
            createNewSpell();
        }else
        if(event.deltaY<0){
            dataModel.currentSpellId = neighbourSpell(dataModel.currentSpellId,-1);
            createNewSpell();
        }
    }
    canvasElement.addEventListener("wheel", onWheel, false);



    return scene;
}

