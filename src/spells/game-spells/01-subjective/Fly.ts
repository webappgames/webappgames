//import * as BABYLON from 'babylonjs';
import Spell from '../../AbstractSpell';
import log from '../../../tools/log';

export default class Fly extends Spell{

    public TARGETS = 0;

    execute(){
        log.send('AbstractSpell!');
    }
}