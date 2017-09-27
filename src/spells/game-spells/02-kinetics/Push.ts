//import * as BABYLON from 'babylonjs';
import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';
//import log from '../../../tools/log';

//todo Push/Pull should have Abstract parent
export default class Push extends AbstractSpellOnMeshes{

    finish(){
        super.finish();

        this.firstTargetMesh.physicsImpostor.setLinearVelocity(this.direction.scale(50));


    }
}