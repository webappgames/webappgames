import * as BABYLON from 'babylonjs';
import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';
//import log from '../../../tools/log';

export default class Teleport extends AbstractSpellOnMeshes{

    public ALLOW_GROUND = true;

    get price():number{
        return 0;
    }

    finish(){
        super.finish();
        if(this.firstTargetMesh.name==='ground'){
            this.world.player.mesh.position = this.targets[0].pickedPoint.add(new BABYLON.Vector3(0,2,0));
        }else{
            this.world.player.mesh.position = this.firstTargetMesh.position.add(
                new BABYLON.Vector3(
                    0,this.firstTargetMesh.scaling.y/2+2,0
                )
            );
        }
    }
}