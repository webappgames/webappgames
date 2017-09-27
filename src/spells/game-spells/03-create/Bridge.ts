//import * as BABYLON from 'babylonjs';
import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';
//import log from '../../../tools/log';

export default class Bridge extends AbstractSpellOnMeshes{

    get price():number{
        return 0;
    }

    finish(){
        super.finish();
        //log.send('AbstractSpell!');
    }
}