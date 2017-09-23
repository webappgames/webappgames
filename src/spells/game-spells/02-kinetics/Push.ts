//import * as BABYLON from 'babylonjs';
import Spell from '../../AbstractSpell';
import log from '../../../tools/log';

export default class Push extends Spell{

    execute(){
        log.send('AbstractSpell!');

        this.targetMesh.physicsImpostor.setLinearVelocity(this.direction.scale(50));


    }
}