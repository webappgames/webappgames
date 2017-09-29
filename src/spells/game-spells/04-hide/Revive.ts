//import * as BABYLON from 'babylonjs';
import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';

export default class Revive extends AbstractSpellOnMeshes{

    public ALLOW_NO_PHISICS_IMPOSTOR = true;

    get price():number{
        return 0;
    }

    finish() {
        super.finish();
        //this.firstTargetMesh.physicsImpostor.
        this.firstTargetMesh.visibility = 1;
    }
}