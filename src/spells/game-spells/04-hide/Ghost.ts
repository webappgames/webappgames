//import * as BABYLON from 'babylonjs';
import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';

export default class Ghost extends AbstractSpellOnMeshes{

    get price():number{
        return 0;
    }

    finish() {
        super.finish();
        this.firstTargetMesh.physicsImpostor.dispose();
        this.firstTargetMesh.visibility = 0.7;
    }
}