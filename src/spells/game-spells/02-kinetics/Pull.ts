//import * as BABYLON from 'babylonjs';
import AbstractDirectionSpell from './AbstractDirectionSpell';
//import log from '../../../tools/log';

export default class Pull extends AbstractDirectionSpell{
    get scale():number{
        return -3000;
    }
}