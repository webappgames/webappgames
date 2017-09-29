import * as BABYLON from 'babylonjs';
import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';
import {countVolume} from '../../../tools/babylon';

export default class Spin extends AbstractSpellOnMeshes{

    public EFFECT_COLORS = {
        color1: '#0700ff',
        color2: '#8000ff'
    };

    get price():number{
        return 0;
    }

    /*execute(){
        const costEnergy = countVolume(this.targets[0].pickedMesh)*this.targets[0].pickedMesh.position.subtract(this.playerMesh.position).length()/10;

        this.costCallback(costEnergy);
        super.execute();
    }*/
    finish(){
        super.finish();
        const volume = countVolume(this.targets[0].pickedMesh);
        this.targets[0].pickedMesh.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0,1000/volume,0));
    }

}