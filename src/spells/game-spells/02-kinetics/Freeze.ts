//import * as BABYLON from 'babylonjs';
import Spell from '../../AbstractSpell';

export default class Freeze extends Spell{

    get dynamicSpeed():number{
        return 1000;
    }


    execute(){
        this.targetMesh.physicsImpostor.setMass(0);
    }
}