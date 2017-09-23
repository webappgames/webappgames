import * as BABYLON from 'babylonjs';
import Spell from '../../AbstractSpell';

export default class Pillar extends Spell{


    acceptTargetMesh(){
        return(
            Math.abs(this.targetMesh.rotation.x)<0.1 &&
            Math.abs(this.targetMesh.rotation.z)<0.1
        )
    }

    get dynamicTarget():BABYLON.Vector3{
        return this.targetPoint;
    }

    execute(){
        const boxMesh = BABYLON.Mesh.CreateBox("pillar", 1, this.scene);
        boxMesh.position = this.targetPoint.add(new BABYLON.Vector3(0,5,0));
        boxMesh.scaling = new BABYLON.Vector3(1,10,1);
        //boxMesh.rotation = this.targetMesh.rotation.clone();
        //boxMesh.material = this.targetMesh.material.clone('clonedMaterial');


        boxMesh.physicsImpostor = new BABYLON.PhysicsImpostor(boxMesh, BABYLON.PhysicsImpostor.BoxImpostor, {
            mass: 100,
            restitution: 0.2
        }, this.scene);
    }
}