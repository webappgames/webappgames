//import * as BABYLON from 'babylonjs';
import Spell from '../../Spell';
import log from '../../../tools/log';

export default class Xxxx extends Spell{

    execute(){
        log.send('Spell!');

        this.targetMesh.physicsImpostor.setLinearVelocity(this.direction.scale(50));


    }
}