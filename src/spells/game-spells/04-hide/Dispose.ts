//import * as BABYLON from 'babylonjs';
import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';

export default class Dispose extends AbstractSpellOnMeshes{

    public ALLOW_NO_PHISICS_IMPOSTOR = true;

    public EFFECT_COLORS = {
        color1: '#45ff00',
        color2: '#13ffed'
    };


    get price():number{
        return 0;
    }


    finish() {
        super.finish();
        this.firstTargetMesh.dispose();
    }
}