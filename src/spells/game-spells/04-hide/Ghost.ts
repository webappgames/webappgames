//import * as BABYLON from 'babylonjs';
import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';

export default class Ghost extends AbstractSpellOnMeshes{
    finish() {
        super.finish();
        this.firstTargetMesh.physicsImpostor.dispose();
        this.firstTargetMesh.visibility = 0.9;
    }
}