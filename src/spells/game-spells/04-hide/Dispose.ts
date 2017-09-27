//import * as BABYLON from 'babylonjs';
import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';

export default class Dispose extends AbstractSpellOnMeshes{

    finish() {
        super.finish();
        this.firstTargetMesh.dispose();
    }
}