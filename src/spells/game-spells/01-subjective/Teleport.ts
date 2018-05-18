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

        /*todo player
        this.world.player.mesh.position = this.firstTargetBrick.position.add(
            new BABYLON.Vector3(
                0,this.firstTargetBrick.size.y/2+2,0//todo person tall
            )
        );*/

        /*
        todo teleportation to ground
        if(this.firstTargetMesh.name==='ground'){

            this.world.player.mesh.position = this.targets[0].pickedPoint.add(new BABYLON.Vector3(0,2,0));
        }else{

        }*/
    }
}