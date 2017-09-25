/*import * as BABYLON from 'babylonjs';
import Spell from '../../AbstractSpell';
import {countVolume} from '../../../tools/babylon';

export default class Bounce extends Spell{

    execute(){

        this.targetMesh.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,100,0));
    }

    countEnergyCost():number{
        return(
            countVolume(this.targetMesh)
            *this.targetMesh.position.subtract(this.playerMesh.position).length()/10
        );
    }
}*/