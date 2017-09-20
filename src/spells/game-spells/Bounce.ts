import * as BABYLON from 'babylonjs';
import Spell from '../Spell';

export default class Bounce extends Spell{

    public static title = 'Bounce';
    public static cathegory = 'Xxxxxx';

    execute(){

        this.target.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,100,0));
    }
}