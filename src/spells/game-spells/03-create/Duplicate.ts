//import * as BABYLON from 'babylonjs';
import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';
//import log from '../../../tools/log';

export default class Duplicate extends AbstractSpellOnMeshes{

    get price():number{
        return 0;
    }

    finish(){
        super.finish();
        this.firstTargetMesh.clone('box',this.firstTargetMesh.parent);
    }
}