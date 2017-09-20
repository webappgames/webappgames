import * as BABYLON from 'babylonjs';
import Spell from './Spell';
//import spells from './spells';
import {getSpellById} from './spellTools';

export default function spellFactory(spellId:string,target:BABYLON.AbstractMesh):Spell{
    return new (getSpellById(spellId))(target);
}