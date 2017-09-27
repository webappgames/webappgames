//import * as BABYLON from 'babylonjs';
import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';

export default class Freeze extends AbstractSpellOnMeshes{

    get price():number{
        return 0;
    }

    get dynamicSpeed():number{
        return 1000;
    }


    finish(){
        super.finish();
        this.firstTargetMesh.physicsImpostor.setMass(0);
    }
}