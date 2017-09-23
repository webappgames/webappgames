import * as BABYLON from 'babylonjs';
import Spell from './AbstractSpell';
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
        scene:BABYLON.Scene,
    ):Spell{
        return new (getSpellById(spellId))(
            targetMesh,
            targetPoint,
            playerMesh,
            scene,
            this.sharedStarage,
        );
    }
}

export default new SpellFactory({});