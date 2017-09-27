//import * as BABYLON from 'babylonjs';
import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';

export default class Dispose extends AbstractSpellOnMeshes{

    get price():number{
        return 0;
    }


    finish() {
        super.finish();
        this.firstTargetMesh.dispose();
    }
}