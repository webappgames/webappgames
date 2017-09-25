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
        scene:BABYLON.Scene
    ){

        this.fountainMesh = BABYLON.Mesh.CreateBox("fountain", 1, scene);
        this.fountainMesh.isVisible = false;
        this.fountainMesh.position = startPoint.clone();
        this.spellParticles = createSpellParticles(this.fountainMesh,scene);
    }

    public speed = 100;

    tick(tickDuration:number) {

        const tickSpeed = this.speed*tickDuration/1000;
        console.log(tickSpeed);

        //todo optimize by targetPoint setter
        const movementVector = this.targetPoint.subtract(this.fountainMesh.position);
        const movementVectorLength = movementVector.length();

        if (movementVectorLength > tickSpeed) {
            movementVector.scaleInPlace(tickSpeed / movementVectorLength);
        } else {
            movementVector.scaleInPlace(1 / movementVectorLength);
            //todo spell.direction = movementVector;
            this.finishCallback();
            this.stop();
        }
        this.fountainMesh.position.addInPlace(movementVector);
    }

    stop(){
        this.spellParticles.stop();
        setTimeout(() => {
            this.fountainMesh.dispose();
        }, 5000/*todo count this value*/);
    }
}