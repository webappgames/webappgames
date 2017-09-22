import * as BABYLON from 'babylonjs';
import Spell from '../../Spell';
import log from '../../../tools/log';

export default class Xxxx extends Spell{

    execute(){
        log.send('Spell!');


        this.playerMesh.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,100,0));
    }
}