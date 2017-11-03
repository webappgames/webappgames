//import * as BABYLON from 'babylonjs';
import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';

export default class Freeze extends AbstractSpellOnMeshes{

    public EFFECT_COLORS = {
        color1: '#45ff00',
        color2: '#13ffed'
    };
    get price():number{
        return 0;
    }

    get dynamicSpeed():number{
        return 1000;
    }


    finish(){
        super.finish();
        this.firstTargetBrick.materialName = 'stone-plain-freezed';
    }
}