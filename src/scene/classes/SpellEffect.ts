//import log from '../tools/log';
import * as BABYLON from 'babylonjs';
import createSpellParticles from '../create-spell-particles';//todo move here or to 1 directory with this file

export default class SpellEffect{

    private fountainMesh:BABYLON.AbstractMesh;
    private spellParticles:BABYLON.ParticleSystem;

    constructor(
        //private color:string,//todo maybe BABYLON color?
        public startPoint:BABYLON.Vector3,
        public targetPoint:BABYLON.Vector3,
        private finishCallback:()=>void,
        colors:{color1:string,color2:string},
        scene:BABYLON.Scene,
        public speed = 100
    ){

        this.fountainMesh = BABYLON.Mesh.CreateBox("fountain", 1, scene);
        this.fountainMesh.isVisible = false;
        this.fountainMesh.position = startPoint.clone();
        this.spellParticles = createSpellParticles(this.fountainMesh,colors,scene);
    }

    public running = true;

    public direction:BABYLON.Vector3=BABYLON.Vector3.Zero();

    tick(tickDuration:number) {

        if(!this.running)return;

        const tickSpeed = this.speed*tickDuration/1000;

        //todo optimize by targetPoint setter
        const movementVector = this.targetPoint.subtract(this.fountainMesh.position);
        const movementVectorLength = movementVector.length();

        if (movementVectorLength > tickSpeed) {
            movementVector.scaleInPlace(tickSpeed / movementVectorLength);
        } else {
            movementVector.scaleInPlace(1 / movementVectorLength);
            this.direction = movementVector;
            this.running = false
            setImmediate(this.finishCallback);
            this.stop();
        }
        this.fountainMesh.position.addInPlace(movementVector);
    }

    stop(){
        this.spellParticles.stop();
        setTimeout(() => {
            try {
                this.fountainMesh.dispose();
            }catch(error){
                //World can be reloaded at this time.
                console.warn(error);
            }
        }, 5000/*todo count this value*/);
    }
}