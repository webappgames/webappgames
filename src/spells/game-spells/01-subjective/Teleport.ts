//import * as BABYLON from 'babylonjs';
import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';
//import log from '../../../tools/log';

export default class Teleport extends AbstractSpellOnMeshes{

    public ALLOW_GROUND = true;

    get price():number{
        return 0;
    }

    finish(){
        super.finish();

        //todo better with clone
        //todo teleport to target point not to middle of target mesh
        this.playerMesh.position.x = this.firstTargetMesh.position.x;
        this.playerMesh.position.y = this.firstTargetMesh.position.y+this.firstTargetMesh.scaling.y/2+2;
        this.playerMesh.position.z = this.firstTargetMesh.position.z;
        //this.playerMesh.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,100,0));
    }
}