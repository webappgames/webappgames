// import * as BABYLON from 'babylonjs';
// import Spell from '../../AbstractSpell';
//
// export default class Wall extends Spell{
//     acceptTargetMesh() {
//         if (this.sharedStarage.firstPoint) {
//
//
//             return (
//                 Math.abs(this.sharedStarage.firstPoint.y+ this.targetPoint.y)<=0.5
//             );
//
//         }
//
//         return true;
//
//
//     }
//
//     get dynamicSpeed():number{
//         return (this.point1&&this.point2)?100:1000;
//     }
//
//     get message():string{
//         if (this.sharedStarage.firstPoint) {
//             return('2/2');
//         }else{
//             return('1/2');
//         }
//     }
//
//
//
//     private point1:BABYLON.Vector3|null = null;
//     private point2:BABYLON.Vector3|null = null;
//
//     begin(){
//         if (!this.sharedStarage.firstPoint) {
//             this.sharedStarage.firstPoint = this.targetPoint;
//
//         }else{
//
//             this.point1 = this.sharedStarage.firstPoint;
//             this.point2 = this.targetPoint;
//
//             this.sharedStarage.firstPoint=null;
//         }
//
//     }
//
//     execute() {
//
//         if (this.point1&&this.point2){
//
//
//             const middlePoint = this.point1.add(this.point2).scale(1 / 2);
//             const pointDiff = this.point2.subtract(this.point1);
//             const length = pointDiff.length();
//
//             const rotation = Math.atan2(pointDiff.x,pointDiff.z);
//             const width = 1;
//             const tall = 11;
//
//
//             const boxMesh = BABYLON.Mesh.CreateBox("box", 1, this.scene);
//             boxMesh.position = middlePoint.add(new BABYLON.Vector3(0, tall/2, 0));
//             boxMesh.scaling = new BABYLON.Vector3(width, tall, length+2);
//             boxMesh.rotation = new BABYLON.Vector3(0,rotation,0);
//
//
//
//             boxMesh.physicsImpostor = new BABYLON.PhysicsImpostor(boxMesh, BABYLON.PhysicsImpostor.BoxImpostor, {
//                 mass: 10,
//                 restitution: 0.2
//             }, this.scene);
//
//             this.sharedStarage.firstPoint = null;
//         }
//
//
//     }
//
// }