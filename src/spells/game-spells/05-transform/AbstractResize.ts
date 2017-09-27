import * as BABYLON from 'babylonjs';
import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';

export default class AbstractResize extends AbstractSpellOnMeshes{
    finish(){
        super.finish();


        const boxMesh = BABYLON.Mesh.CreateBox("box", 1, this.scene);
        boxMesh.position = this.firstTargetMesh.position.clone();
        boxMesh.scaling = this.firstTargetMesh.scaling.scale(this.scaling);
        boxMesh.rotation = this.firstTargetMesh.rotation.clone();
        boxMesh.material = this.firstTargetMesh.material.clone('clonedMaterial');

        this.firstTargetMesh.dispose();

        boxMesh.physicsImpostor = new BABYLON.PhysicsImpostor(boxMesh, BABYLON.PhysicsImpostor.BoxImpostor, {
            mass: 10,
            restitution: 0.2
        }, this.scene);


    }
    get scaling():number{
        return 1;
    }
}