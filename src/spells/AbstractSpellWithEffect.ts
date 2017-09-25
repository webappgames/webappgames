//import * as BABYLON from 'babylonjs';
import AbstractSpell from './AbstractSpell';
//import {spellPhases} from './AbstractSpell';
import SpellEffect from '../scene/classes/SpellEffect';


export default class AbstractSpellWithEffect extends AbstractSpell {

    private spellEffect: SpellEffect;

    execute() {
        super.execute();
        this.spellEffect = new SpellEffect(
            this.playerMesh.position,
            this.targets[0].pickedMesh.position,
            this.finish,
            this.scene,
        );
    }

    get isPrepared():boolean{
        return this.targets.length===1;
    }

    tick(tickDuration:number) {
        super.tick(tickDuration);
        this.spellEffect.tick(tickDuration);
    }

    finish() {
        super.finish();
        this.spellEffect.stop();
    }
}