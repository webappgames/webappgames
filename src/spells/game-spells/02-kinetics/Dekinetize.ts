//import * as BABYLON from 'babylonjs';
import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';


export default class Dekinetize extends AbstractSpellOnMeshes{

    public EFFECT_COLORS = {
        color1: '#0700ff',
        color2: '#8000ff'
    };

    get price():number{
        return 0;
    }

    get dynamicSpeed(){
        return 1000;
    }

    finish() {
        super.finish();

        this.firstTargetBrick.angularVelocity = this.firstTargetBrick.angularVelocity.scale(-1);
        this.firstTargetBrick.linearVelocity = this.firstTargetBrick.linearVelocity.scale(-1);
    }
}