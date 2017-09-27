import * as BABYLON from 'babylonjs';
import AbstractSpell from './AbstractSpell';
import MaterialFactory from '../../scene/classes/MaterialFactory';
//import spells from './spells';
import {getSpellById} from '../tools/index';

class SpellFactory{

    constructor(){
    }

    createSpell(
        spellId:string,
        costCallback:(energy:number)=>boolean,
        gainCallback:(energy:number)=>void,
        otherPlayerSpell:AbstractSpell[],
        playerMesh:BABYLON.AbstractMesh,
        groundMesh:BABYLON.AbstractMesh,
        materialFactory:MaterialFactory,
        scene:BABYLON.Scene,
    ):AbstractSpell{
        //todo better
        return new (getSpellById(spellId))(
            costCallback,
            gainCallback,
            otherPlayerSpell,
            playerMesh,
            groundMesh,
            materialFactory,
            scene
        );
    }
}

export default new SpellFactory();