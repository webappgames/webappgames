import * as BABYLON from 'babylonjs';
import World from '../World';
//import createCamera from './createCamera';
import setPlayerMouseLock from './setPlayerMouseLock';
import setPlayerMovement from './setPlayerMovement';
import setPlayerSpells from './setPlayerSpells';
import {PLAYER} from '../../../config';
import * as _ from "lodash";
import IPickingInfo from '../../../interfaces/IPickingInfo';


export default class Player{


    //public mesh:BABYLON.AbstractMesh;
    public camera:BABYLON.FreeCamera|BABYLON.WebVRFreeCamera;//todo remove
    public vrHelper: BABYLON.VRExperienceHelper;
    public player:BABYLON.AbstractMesh;
    private _playStepSound:()=>void;


    constructor(
        public world:World
    ){

        //this.camera = createCamera(world);
        this.vrHelper = world.scene.createDefaultVRExperience();
        this.camera = this.vrHelper.currentVRCamera as any;//todo as getter



        this.vrHelper.enableTeleportation({floorMeshName: "ground"});
        /*this.vrHelper.raySelectionPredicate = (mesh) => {
            if (mesh.name.indexOf("Flags") !== -1) {
                return true;
            }
            return false;
        };*/
   

        let lastPicked:IPickingInfo|null = null;

        this.vrHelper.onNewMeshPicked.add((pickingInfo) => {
            lastPicked = this.world.convertPickingInfo(pickingInfo);//todo optimize
        });


        
        
        this.vrHelper.onControllerMeshLoadedObservable.add((controller)=>{

            console.log( controller);

            controller.onTriggerStateChangedObservable.add((gamepadButton) => {
                //console.log('onTriggerStateChangedObservable', gamepadButton);

                //controller.browserGamepad.hapticActuators.forEach((hapticActuator: any)=>hapticActuator.pulse(gamepadButton.value,1000));//todo as type use GamepadHapticActuator


                if(gamepadButton.value===1){

                    try {
                        spellAddTarget(lastPicked as any);//todo why any?
                    } catch (error) {
                        //todo catch only SpellError extended from Error
                        this.world.uiDataModel.sendMessage(error.message as string);
                    }
           
                }
            });

            controller.onMainButtonStateChangedObservable.add((gamepadButton) => {
                //console.log('onMainButtonStateChangedObservable', gamepadButton);
            });

            controller.onSecondaryButtonStateChangedObservable.add((gamepadButton) => {
                //console.log('onSecondaryButtonStateChangedObservable', gamepadButton);
            });


            controller.onPadStateChangedObservable.add((gamepadButton) => {
                //console.log('onPadStateChangedObservable', gamepadButton);
            });

            controller.onPadValuesChangedObservable.add((gamepadButton) => {
                //console.log('onPadValuesChangedObservable', gamepadButton);
            });
        });
        



        /*this.mesh = BABYLON.Mesh.CreateSphere("player", 16,1, world.scene);
        this.mesh.isVisible = false;
        this.mesh.position =  new BABYLON.Vector3(0, 2, 0);
        this.mesh.rotation =  new BABYLON.Vector3(0, 0, 0);
        this.mesh.scaling =  new BABYLON.Vector3(1, 4, 1);
        this.mesh.physicsImpostor = new BABYLON.PhysicsImpostor(this.mesh, BABYLON.PhysicsImpostor.SphereImpostor, {
            mass: 10,//todo player physical options to config
            restitution: 0.01,
            friction: 100
        }, world.scene);
        this.camera.position = this.mesh.position.clone();//todo is it needed?*/

        const stepSound = world.soundFactory.getSound('step-ground');
        stepSound.setVolume(2);//todo to global sound config
        this._playStepSound = _.throttle(()=>stepSound.play(),400, {leading:true,trailing:false});

        const spellAddTarget = setPlayerSpells(this);
     


    }

    get position(){
        return this.vrHelper.currentVRCamera!.position;
    }

    set position(position: BABYLON.Vector3){
        //todo
    }

    /*get direction():BABYLON.Vector3{
        const point1 = this.mesh.position;
        const pickingInfo = this.world.scene.pick(this.world.canvasElement.width / 2, this.world.canvasElement.height / 2, (mesh)=>mesh === this.world.skyboxMesh);

        if(!pickingInfo){
            throw new Error(`Can not count direction because can not get skybox picking info.`);
        }

        const point2 = pickingInfo.pickedPoint;

        if(!point2){
            throw new Error(`Can not count direction because can not pick skybox point.`);
        }

        return point2.subtract(point1);
    }

    get direction1():BABYLON.Vector3{
        const playerDirection = this.direction;
        return playerDirection.scale(1/playerDirection.length());
    }


    get rotationY():number{
        //todo Is thare a simple and better solution how to count camera rotation after world load than picking?
        //eg. const cameraRotation = Math.PI/2 - camera.rotation.y;
        const playerDirection = this.direction;
        return Math.atan2(playerDirection.z,playerDirection.x);
    }*/

    //todo separate jump and walk
    addMovement(vector:BABYLON.Vector3){

        /*this._playStepSound();

        const currentVelocity = this.mesh.physicsImpostor!.getLinearVelocity();

        //todo Jumping on flying object
        const onGround = true;//currentVelocity.y<1;//playerMesh.position.y<=2;

        const distance = Math.sqrt(Math.pow(vector.x,2)+Math.pow(vector.z,2));
        const rotation = Math.atan2(vector.z,vector.x)+this.rotationY;


        const rotatedVector = new BABYLON.Vector3(
            Math.cos(rotation)*distance,
            onGround?vector.y:0,
            Math.sin(rotation)*distance
        );

        const composedVelocity = currentVelocity!.add(rotatedVector);
        const jumpVelocity = new BABYLON.Vector3(0,composedVelocity.y,0);
        const surfaceVelocity = new BABYLON.Vector3(composedVelocity.x,0,composedVelocity.z);

        const surfaceVelocityLength = surfaceVelocity.length();
        if(surfaceVelocityLength>PLAYER.SPEED.TERMINAL){
            surfaceVelocity.scaleInPlace(PLAYER.SPEED.TERMINAL/surfaceVelocityLength);
        }

        const composedVelocityTerminated = surfaceVelocity.add(jumpVelocity);

        this.mesh.physicsImpostor!.setLinearVelocity(composedVelocityTerminated);
        */

    }



}


