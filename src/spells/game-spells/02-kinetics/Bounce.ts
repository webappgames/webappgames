import * as BABYLON from 'babylonjs';
import Spell from '../../classes/AbstractSpellOnMeshes';
import {countVolume} from '../../../tools/babylon';

export default class Bounce extends Spell{

    execute(){
        const costEnergy = countVolume(this.targets[0].pickedMesh)*this.targets[0].pickedMesh.position.subtract(this.playerMesh.position).length()/10;

        if(!this.costCallback(costEnergy)){
            //todo phase for this
            throw new Error('Not enough resources');
        }else {
            super.execute();
        }
    }
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