//import * as BABYLON from 'babylonjs';
import Spell from '../../AbstractSpell';
import log from '../../../tools/log';

export default class Noclip extends Spell{

    execute(){
        log.send('AbstractSpell!');
    }
}