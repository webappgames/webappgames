import * as BABYLON from 'babylonjs';
import Spell from './Spell';
//import spells from './spells';
import {getSpellById} from './spellTools';

export default function spellFactory(
    spellId:string,
    targetMesh:BABYLON.AbstractMesh,
    playerMesh:BABYLON.AbstractMesh
):Spell{
    return new (getSpellById(spellId))(targetMesh,playerMesh);
}