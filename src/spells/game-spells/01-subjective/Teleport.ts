//import * as BABYLON from 'babylonjs';
import Spell from '../../AbstractSpell';
import log from '../../../tools/log';

export default class Teleport extends Spell{

    execute(){
        log.send('AbstractSpell!');

        //todo better with clone
        //todo teleport to target point not to middle of target mesh
        this.playerMesh.position.x = this.targetMesh.position.x;
        this.playerMesh.position.y = this.targetMesh.position.y+this.targetMesh.scaling.y/2+2;
        this.playerMesh.position.z = this.targetMesh.position.z;
        //this.playerMesh.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,100,0));
    }
}