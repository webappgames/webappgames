import * as BABYLON from 'babylonjs';
import Spell from '../../AbstractSpell';

export default class Pillar extends Spell{

    public target='POINT';

    acceptTargetMesh(){
        return this.targetMesh.name==='ground'
    }

    execute(){
        const boxMesh = BABYLON.Mesh.CreateBox("box", 4, this.scene);
        boxMesh.position = this.targetPoint.add(new BABYLON.Vector3(0,10,0));
        boxMesh.scaling = new BABYLON.Vector3(1,10,1);
        //boxMesh.rotation = this.targetMesh.rotation.clone();
        //boxMesh.material = this.targetMesh.material.clone('clonedMaterial');


        boxMesh.physicsImpostor = new BABYLON.PhysicsImpostor(boxMesh, BABYLON.PhysicsImpostor.BoxImpostor, {
            mass: 10,
            restitution: 0.2
        }, this.scene);
    }
}