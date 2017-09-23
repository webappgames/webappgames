//import * as BABYLON from 'babylonjs';
import Spell from '../../AbstractSpell';

export default class Noclip extends Spell{

    execute(){
        this.playerMesh.physicsImpostor.resetUpdateFlags();
    }
}