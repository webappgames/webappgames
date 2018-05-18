import * as BABYLON from 'babylonjs';
import IPickingInfo from '../../interfaces/IPickingInfo';
import AbstractSpell from './AbstractSpell';
//import {spellPhases} from './AbstractSpell';
import SpellEffect from '../../world/classes/SpellEffect';
import AbstractBrick from '../../world/classes/bricks/AbstractBrick';
import {isNull} from "util";


export default class AbstractSpellOnMeshes extends AbstractSpell {

    public TARGET_COUNT = 1;
    public ALLOW_GROUND = false;
    public ALLOW_NO_PHISICS_IMPOSTOR = false;
    public EFFECT_COLORS = {
        color1: '#ffffff',
        color2: '#ffffff'
    };


    get dynamicSpeed(){
        return 100;
    }

    get dynamicTargetPoints():BABYLON.Vector3[]{
        return this.targets.map((target)=>target.pickedPoint);
        /*if(this.ALLOW_GROUND){
            return this.targets.map((target)=>target.pickedPoint)
        }else{
            return this.targets.map((target)=>(target.pickedBrick as AbstractBrick).position)
        }*/
    }

    private spellEffects: SpellEffect[];
    get direction():BABYLON.Vector3{
        return this.spellEffects[0].direction;
    }

    addTarget(target:IPickingInfo){

        if (isNull(target.pickedBrick)) {
            throw new Error(`You must select an object.`);//todo copywriting
        }else
        //!todo ground as Brick
        //if(!this.ALLOW_GROUND && target.pickedBrick.name==='ground'){
        //    throw new Error(`This spell cant be released on ground.`);//todo copywriting
        //}
        //todo how to handle this with bricks
        //if(!this.ALLOW_NO_PHISICS_IMPOSTOR && target.pickedMesh.physicsImpostor.isDisposed){
        //    throw new Error(`Object must have physics.`);
       // }
        //else
        //if(this.targets.length===this.TARGET_COUNT){
        //    throw new Error(`This spell has already all ${this.TARGET_COUNT} targets.`);
        //else
        {
            super.addTarget(target);

            if(this.targets.length===this.TARGET_COUNT){
                this.execute();
            }

        }
        ;
    }

    execute(){
        if(this.targets.length!==this.TARGET_COUNT){
            throw new Error(`Thare should be exactly ${this.TARGET_COUNT} target not ${this.targets.length}.`);
        }


        this.spellEffects =
        this.dynamicTargetPoints.map((targetPoint)=>{
            return new SpellEffect(
                this.world.player.position,
                targetPoint,
                ()=>{
                    const running = this.spellEffects.some((spellEffect)=>spellEffect.running);
                    //console.log(running);
                    if(!running){
                        try {
                            this.finish();
                        }catch(error){
                            //todo better
                            console.warn(error);
                        }
                    }
                },
                this.EFFECT_COLORS,
                this.world.scene,
                this.dynamicSpeed);
        });

        //todo const spellSound = new BABYLON.Sound("Spell", `${process.env.PUBLIC_URL}/assets/sound/link-teleport.mp3`, this.world.scene, undefined, { loop: false, autoplay: true });
        //todo spellSound;

        this.release();
        super.execute();
    }

    tick(tickDuration:number) {
        super.tick(tickDuration);
        this.spellEffects.forEach((spellEffect)=>{
            spellEffect.tick(tickDuration);
        })

    }

    get price():number{
        return 0;
    }

    finish() {
        super.finish();
        this.costCallback(this.price);
        //this.spellEffect.stop();
    }
}