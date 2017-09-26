import * as BABYLON from 'babylonjs';
import AbstractSpell from './AbstractSpell';
//import {spellPhases} from './AbstractSpell';
import SpellEffect from '../../scene/classes/SpellEffect';


export default class AbstractSpellWithEffect extends AbstractSpell {

    public TARGET_COUNT = 1;
    public ALLOW_GROUND = false;
    private spellEffect: SpellEffect;

    addTarget(target:BABYLON.PickingInfo){
        if(target.pickedMesh===this.groundMesh){
            throw new Error(`This spell do not accept ground to be a target.`);
        }else
        if(this.targets.length===this.TARGET_COUNT){
            //todo maybe not
            throw new Error(`This spell has already all ${this.TARGET_COUNT} targets.`);
        }else{
            super.addTarget(target)
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
        );
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