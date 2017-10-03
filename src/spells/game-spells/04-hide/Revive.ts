//import * as BABYLON from 'babylonjs';
import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';

export default class Revive extends AbstractSpellOnMeshes{

    public EFFECT_COLORS = {
        color1: '#000000',
        color2: '#e5eaff'
    };

    public ALLOW_NO_PHISICS_IMPOSTOR = true;

    get price():number{
        return 0;
    }

    finish() {
        super.finish();
        this.world.materialFactory.applyMaterial(this.firstTargetMesh);
        //this.firstTargetMesh.physicsImpostor.
        //this.firstTargetMesh.visibility = 1;
    }
}