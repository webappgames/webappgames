import * as BABYLON from 'babylonjs';
import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';

export default class Bounce extends AbstractSpellOnMeshes{

    public EFFECT_COLORS = {
        color1: '#0700ff',
        color2: '#8000ff'
    };

    get price():number{
        return 0;
    }

    /*execute(){

        const volume = countVolume(this.targets[0].pickedMesh);

        this.costCallback(costEnergy);
        super.execute();
    }*/
    finish(){
        super.finish();
        this.firstTargetBrick.linearVelocity = new BABYLON.Vector3(0,10000/this.firstTargetBrick.volume,0);
    }

}