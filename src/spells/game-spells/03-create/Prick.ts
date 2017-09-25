// /*import * as BABYLON from 'babylonjs';
// import Spell from '../../AbstractSpell';
//
// export default class Prick extends Spell {
//
//
//     acceptTargetMesh() {
//         return this.targetMesh.name === 'pillar'
//     }
//
//     execute() {
//
//         if (!this.sharedStarage.firstPillarMesh) {
//             this.sharedStarage.firstPillarMesh = this.targetMesh;
//
//         } else {
//
//
//             const point1 = this.sharedStarage.firstPillarMesh.position;
//             const point2 = this.targetMesh.position;
//             const middlePoint = point1.add(point2).scale(1 / 2);
//             const pointDiff = point2.subtract(point1);
//             const length = pointDiff.length();
//
//             const rotation = Math.atan2(pointDiff.x,pointDiff.z);
//
//
//             const boxMesh = BABYLON.Mesh.CreateBox("prick", 1, this.scene);
//             boxMesh.position = middlePoint.add(new BABYLON.Vector3(0, 5, 0));
//             boxMesh.scaling = new BABYLON.Vector3(1, 1, length+2);
//             boxMesh.rotation = new BABYLON.Vector3(0,rotation,0);
//             //boxMesh.material = this.targetMesh.material.clone('clonedMaterial');
//
//
//             boxMesh.physicsImpostor = new BABYLON.PhysicsImpostor(boxMesh, BABYLON.PhysicsImpostor.BoxImpostor, {
//                 mass: 100,
//                 restitution: 0.2
//             }, this.scene);
//
//             this.sharedStarage.firstPillarMesh = null;
//         }
//
//
//     }
//
//
// }*/