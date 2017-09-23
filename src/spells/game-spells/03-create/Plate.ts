import * as BABYLON from 'babylonjs';
import Spell from '../../AbstractSpell';

export default class Plate extends Spell{
    acceptTargetMesh() {
        return this.targetMesh.name === 'prick'
    }

    execute() {

        if (!this.sharedStarage.firstPillarMesh) {
            this.sharedStarage.firstPillarMesh = this.targetMesh;

        } else {

            const prick1 = this.sharedStarage.firstPillarMesh;
            const prick2 = this.targetMesh;
            const point1 = prick1.position;
            const point2 = prick2.position;

            const middlePoint = point1.add(point2).scale(1 / 2);
            const pointDiff = point2.subtract(point1);
            const length = pointDiff.length();

            const rotation = Math.atan2(pointDiff.x,pointDiff.z);
            const width = Math.max(prick1.scaling.z,prick2.scaling.z);


            const boxMesh = BABYLON.Mesh.CreateBox("plate", 1, this.scene);
            boxMesh.position = middlePoint.add(new BABYLON.Vector3(0, 5, 0));
            boxMesh.scaling = new BABYLON.Vector3(width, 1, length+2);
            boxMesh.rotation = new BABYLON.Vector3(0,rotation,0);
            //boxMesh.material = this.targetMesh.material.clone('clonedMaterial');


            boxMesh.physicsImpostor = new BABYLON.PhysicsImpostor(boxMesh, BABYLON.PhysicsImpostor.BoxImpostor, {
                mass: 100,
                restitution: 0.2
            }, this.scene);

            this.sharedStarage.firstPillarMesh = null;
        }


    }

}