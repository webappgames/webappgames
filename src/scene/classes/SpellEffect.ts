//import log from '../tools/log';
import * as BABYLON from 'babylonjs';
import createSpellParticles from '../create-spell-particles';//todo move here or to 1 directory with this file

export default class SpellEffect{

    private fountainMesh:BABYLON.AbstractMesh;
    private spellSound:BABYLON.Sound;
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


        this.spellSound = new BABYLON.Sound("Step", `${process.env.PUBLIC_URL}/assets/sound/link-key-none.mp3`, scene, undefined, { loop: true, autoplay:true });
        this.spellSound.attachToMesh(this.fountainMesh);
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
        this.spellSound.dispose();
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