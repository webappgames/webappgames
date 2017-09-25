import * as BABYLON from 'babylonjs';
import AbstractSpell from './AbstractSpell';
//import spells from './spells';
import {getSpellById} from './spellTools';

class SpellFactory{

    constructor(){
    }

    createSpell(
        spellId:string,
        costCallback:(energy:number)=>boolean,
        gainCallback:(energy:number)=>void,
        otherPlayerSpell:AbstractSpell[],
        playerMesh:BABYLON.AbstractMesh,
        scene:BABYLON.Scene,
    ):AbstractSpell{
        return new (getSpellById(spellId))(
            costCallback,
            gainCallback,
            otherPlayerSpell,
            playerMesh,
            scene
        );
    }
}

export default new SpellFactory();