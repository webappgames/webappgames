//import * as BABYLON from 'babylonjs';
import Spell from './Spell';

export default class Dispose extends Spell{

    public static id = 'dispose';

    execute(){

        this.target.dispose();
    }
}