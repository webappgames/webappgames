import * as BABYLON from 'babylonjs';
import Spell from '../../AbstractSpell';

export default class Plate extends Spell{
    acceptTargetMesh() {
        if(this.targetMesh.name === 'ground'){
            return false;
        }
        if (this.sharedStarage.firstPillarMesh) {


            return (
                Math.abs((this.sharedStarage.firstPillarMesh.position.y + this.sharedStarage.firstPillarMesh.scaling.y / 2)
                -
                (this.targetMesh.position.y + this.targetMesh.scaling.y / 2))<=0.5
            );


        }

        return true;


    }

    get dynamicSpeed():number{
        return (this.pillar1&&this.pillar2)?100:1000;
    }

    get message():string{
        if (this.sharedStarage.firstPillarMesh) {
            return('2/2');
        }else{
            return('1/2');
        }
    }



    private pillar1:BABYLON.AbstractMesh|null;
    private pillar2:BABYLON.AbstractMesh|null;

    begin(){
        if (!this.sharedStarage.firstPillarMesh) {
            this.sharedStarage.firstPillarMesh = this.targetMesh;

        }else{

            this.pillar1 = this.sharedStarage.firstPillarMesh;
            this.pillar2 = this.targetMesh;

            this.sharedStarage.firstPillarMesh=null;
        }

    }

    execute() {

        if (this.pillar1&&this.pillar2){


            const point1 = this.pillar1.position;
            const point2 = this.pillar2.position;

            const middlePoint = point1.add(point2).scale(1 / 2);
            const pointDiff = point2.subtract(point1);
            const length = pointDiff.length();

            const rotation = Math.atan2(pointDiff.x,pointDiff.z);
            const width = Math.max(this.pillar1.scaling.z,this.pillar2.scaling.z,this.pillar1.scaling.x,this.pillar2.scaling.x);


            const boxMesh = BABYLON.Mesh.CreateBox("plate", 1, this.scene);
            boxMesh.position = middlePoint.add(new BABYLON.Vector3(0, this.pillar1.scaling.y/2+1, 0));
            boxMesh.scaling = new BABYLON.Vector3(width, 1, length+2);
            boxMesh.rotation = new BABYLON.Vector3(0,rotation,0);
            //boxMesh.material = this.targetMesh.material.clone('clonedMaterial');


            boxMesh.physicsImpostor = new BABYLON.PhysicsImpostor(boxMesh, BABYLON.PhysicsImpostor.BoxImpostor, {
                mass: 10,
                restitution: 0.2
            }, this.scene);

            this.sharedStarage.firstPillarMesh = null;
        }


    }

}