//import * as BABYLON from 'babylonjs';
import Spell from '../../AbstractSpell';


export default class Dekinetize extends Spell{

    get dynamicSpeed():number{
        return 1000;
    }

    execute(){
        const angularVelocity = this.targetMesh.physicsImpostor.getAngularVelocity();
        const linearVelocity = this.targetMesh.physicsImpostor.getLinearVelocity();

        this.targetMesh.physicsImpostor.setAngularVelocity(angularVelocity.scale(-1));
        this.targetMesh.physicsImpostor.setLinearVelocity(linearVelocity.scale(-1));
    }
}