//import * as BABYLON from 'babylonjs';
import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';
//import log from '../../../tools/log';

export default class Duplicate extends AbstractSpellOnMeshes{

    public EFFECT_COLORS = {
        color1: '#fff400',
        color2: '#ff3b00'
    };

    get price():number{
        return 0;
    }

    finish(){
        super.finish();
        this.firstTargetMesh.clone('box',this.firstTargetMesh.parent);
    }
}