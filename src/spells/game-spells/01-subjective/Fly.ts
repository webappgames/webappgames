//import * as BABYLON from 'babylonjs';
import Spell from '../../AbstractSpell';
import log from '../../../tools/log';

export default class Fly extends Spell{

    execute(){
        log.send('AbstractSpell!');
    }
}