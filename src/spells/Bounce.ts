import * as BABYLON from 'babylonjs';
import Spell from './Spell';

export default class Bounce extends Spell{

    public static title = 'bounce';

    execute(){

        this.target.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,100,0));
    }
}