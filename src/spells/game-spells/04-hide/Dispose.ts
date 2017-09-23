//import * as BABYLON from 'babylonjs';
import Spell from '../../AbstractSpell';

export default class Dispose extends Spell{

    execute(){

        this.targetMesh.dispose();
    }
}