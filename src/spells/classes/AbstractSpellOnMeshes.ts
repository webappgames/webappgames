import * as BABYLON from 'babylonjs';
import AbstractSpell from './AbstractSpell';
//import {spellPhases} from './AbstractSpell';
import SpellEffect from '../../scene/classes/SpellEffect';


export default class AbstractSpellOnMeshes extends AbstractSpell {

    public TARGET_COUNT = 1;
    public ALLOW_GROUND = false;
    public EFFECT = {
        color1: '#00FF00',
        color2: '#ff0000'
    }

    get dynamicSpeed(){
        return 100;
    }

    get dynamicTargetPoints():BABYLON.Vector3[]{
        if(this.ALLOW_GROUND){
            return this.targets.map((target)=>target.pickedPoint)
        }else{
            return this.targets.map((target)=>target.pickedMesh.position)
        }
    }

    private spellEffects: SpellEffect[];
    get direction():BABYLON.Vector3{
        return this.spellEffects[0].direction;
    }

    addTarget(target:BABYLON.PickingInfo){

        if (!target.hit) {
            throw new Error(`This spell do not accept empty hit.`);//todo copywriting
        }else
        if(!this.ALLOW_GROUND && target.pickedMesh===this.groundMesh){
            throw new Error(`This spell do not accept ground to be a target.`);//todo copywriting
        }
        //else
        //if(this.targets.length===this.TARGET_COUNT){
        //    throw new Error(`This spell has already all ${this.TARGET_COUNT} targets.`);
        else{
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
                this.playerMesh.position,
                targetPoint,
                ()=>{
                    const running = this.spellEffects.some((spellEffect)=>spellEffect.running);
                    //console.log(running);
                    if(!running){
                        this.finish();
                    }
                },
                this.scene,
                this.dynamicSpeed
            );
        });

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