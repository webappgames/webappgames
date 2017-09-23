import * as BABYLON from 'babylonjs';
import Spell from '../../AbstractSpell';

export default class Pillar extends Spell{


    acceptTargetMesh(){
        return this.targetMesh.name==='ground'
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
            mass: 10,
            restitution: 0.2
        }, this.scene);
    }
}