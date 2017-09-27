import * as BABYLON from 'babylonjs';
import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';

export default class Wall extends AbstractSpellOnMeshes {

    get price():number{
        return 0;
    }

    /*acceptTargetMesh() {
     if (this.sharedStarage.firstPoint) {


     return (
     Math.abs(this.sharedStarage.firstPoint.y+ this.targetPoint.y)<=0.5
     );

     }

     return true;


     }*/

    public ALLOW_GROUND = true;
    public TARGET_COUNT = 2;

    finish() {
        super.finish();


        const middlePoint = this.targets[0].pickedPoint.add(this.targets[1].pickedPoint).scale(1 / 2);
        const pointDiff = this.targets[1].pickedPoint.subtract(this.targets[0].pickedPoint);
        const length = pointDiff.length();

        const rotation = Math.atan2(pointDiff.x, pointDiff.z);
        const width = 1;
        const tall = 11;


        const boxMesh = BABYLON.Mesh.CreateBox("box", 1, this.scene);
        boxMesh.position = middlePoint.add(new BABYLON.Vector3(0, tall / 2, 0));
        boxMesh.scaling = new BABYLON.Vector3(width, tall, length + 2);
        boxMesh.rotation = new BABYLON.Vector3(0, rotation, 0);
        boxMesh.material = this.materialFactory.getMaterial('stone-plain');


        boxMesh.physicsImpostor = new BABYLON.PhysicsImpostor(boxMesh, BABYLON.PhysicsImpostor.BoxImpostor, {
            mass: 10,
            restitution: 0.2
        }, this.scene);


    }

}