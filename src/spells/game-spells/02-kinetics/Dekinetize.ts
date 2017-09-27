//import * as BABYLON from 'babylonjs';
import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';


export default class Dekinetize extends AbstractSpellOnMeshes{

    get price():number{
        return 0;
    }

    get dynamicSpeed(){
        return 400;
    }

    finish() {
        super.finish();

        const angularVelocity = this.firstTargetMesh.physicsImpostor.getAngularVelocity();
        const linearVelocity = this.firstTargetMesh.physicsImpostor.getLinearVelocity();

        this.firstTargetMesh.physicsImpostor.setAngularVelocity(angularVelocity.scale(-1));
        this.firstTargetMesh.physicsImpostor.setLinearVelocity(linearVelocity.scale(-1));
    }
}