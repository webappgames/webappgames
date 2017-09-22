import * as BABYLON from 'babylonjs';
import Spell from './Spell';
//import spells from './spells';
import {getSpellById} from './spellTools';

class SpellFactory{

    constructor(public sharedStarage:{}){
    }

    createSpell(
        spellId:string,
        targetMesh:BABYLON.AbstractMesh,
        targetPoint:BABYLON.Vector3,
        playerMesh:BABYLON.AbstractMesh,
    ):Spell{
        return new (getSpellById(spellId))(
            targetMesh,
            targetPoint,
            playerMesh,
            this.sharedStarage,
        );
    }
}

export default new SpellFactory({});