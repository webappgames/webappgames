//import * as BABYLON from 'babylonjs';
import AbstractSpell from './AbstractSpell';
//import {spellPhases} from './AbstractSpell';
import SpellEffect from '../scene/classes/SpellEffect';


export default class AbstractSpellWithEffect extends AbstractSpell {

    public TARGET_COUNT = 1;
    private spellEffect: SpellEffect;

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