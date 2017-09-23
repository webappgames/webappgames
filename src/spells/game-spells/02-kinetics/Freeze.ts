//import * as BABYLON from 'babylonjs';
import Spell from '../../AbstractSpell';

export default class Freeze extends Spell{

    execute(){
        this.targetMesh.physicsImpostor.setMass(0);
    }
}