//import * as BABYLON from 'babylonjs';
import AbstractSpell from './AbstractSpell';
//import {spellPhases} from './AbstractSpell';
import SpellEffect from '../scene/classes/SpellEffect';


export default class AbstractSpellWithEffect extends AbstractSpell {

    private spellEffect: SpellEffect;

    execute(){
        if(this.targets.length!==1){
            throw new Error(`Thare should be exactly 1 target not ${this.targets.length}.`);
        }
        //console.log('creating SpellEffect');
        this.spellEffect = new SpellEffect(
            this.playerMesh.position,
            this.targets[0].pickedMesh.position,
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