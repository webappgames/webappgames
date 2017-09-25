import * as BABYLON from 'babylonjs';
import Spell from '../../AbstractSpellWithEffect';
//import {countVolume} from '../../../tools/babylon';

export default class Bounce extends Spell{

    finish(){
        super.finish();
        this.targets[0].pickedMesh.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,100,0));
    }

    /*countEnergyCost():number{
        return(
            countVolume(this.targetMesh)
            *this.targetMesh.position.subtract(this.playerMesh.position).length()/10
        );
    }*/
}