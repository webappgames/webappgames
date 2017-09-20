//import * as BABYLON from 'babylonjs';
import Spell from '../../Spell';

export default class Dispose extends Spell{

    execute(){

        this.target.dispose();
    }
}