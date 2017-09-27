import * as BABYLON from 'babylonjs';
import AbstractSpell from './AbstractSpell';
//import {spellPhases} from './AbstractSpell';
import SpellEffect from '../../scene/classes/SpellEffect';


export default class AbstractSpellOnMeshes extends AbstractSpell {

    public TARGET_COUNT = 1;//todo maybe getter
    public ALLOW_GROUND = false;//todo maybe getter

    get dynamicSpeed(){
        return 100;
    }

    get dynamicTarget():BABYLON.Vector3{
        return this.firstTargetMesh.position;
    }

    private spellEffect: SpellEffect;
    get direction():BABYLON.Vector3{
        return this.spellEffect.direction;
    }

    addTarget(target:BABYLON.PickingInfo){

        if (!target.hit) {
            throw new Error(`This spell do not accept empty hit.`);//todo copywriting
        }else
        if(target.pickedMesh===this.groundMesh){
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
        //console.log('creating SpellEffect');
        this.spellEffect = new SpellEffect(
            this.playerMesh.position,
            this.targets[this.targets.length-1].pickedMesh.position,
            this.finish.bind(this),
            this.scene,
            this.dynamicSpeed
        );
        this.release();
        super.execute();
    }

    tick(tickDuration:number) {
        super.tick(tickDuration);
        this.spellEffect.tick(tickDuration);

    }

    finish() {
        super.finish();
        //this.spellEffect.stop();
    }
}