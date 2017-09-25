// import * as BABYLON from 'babylonjs';
// import Spell from '../../AbstractSpell';
//
// export default class Desintegrate extends Spell{
//
//     execute(){
//
//
//         this.targetMesh.dispose();
//
//
//         const xParts = 3;
//         const yParts = 3;
//         const zParts = 3;
//
//
//
//         for(let z=0;z<zParts;z++) {
//             const zC = (z + .5) * (1 / zParts);
//             for (let y = 0; y < yParts; y++) {
//                 const yC = (y + .5) * (1 / yParts);
//                 for (let x = 0; x < xParts; x++) {
//                     const xC = (x + .5) * (1 / xParts);
//
//
//                     const boxMesh = BABYLON.Mesh.CreateBox("box", 1, this.scene);
//
//
//                     boxMesh.position = this.targetMesh.position.add(this.targetMesh.scaling.multiplyByFloats(xC - .5,yC - .5,zC - .5));
//
//
//                     boxMesh.scaling = this.targetMesh.scaling.multiplyByFloats(1/xParts,1/yParts,1/zParts);
//                     boxMesh.rotation = this.targetMesh.rotation.clone();
//                     boxMesh.material = this.targetMesh.material.clone('clonedMaterial');
//
//
//                     boxMesh.physicsImpostor = new BABYLON.PhysicsImpostor(boxMesh, BABYLON.PhysicsImpostor.BoxImpostor, {
//                         mass: 10,
//                         restitution: 0.2
//                     }, this.scene);
//
//                 }
//             }
//         }
//
//
//
//
//     }
// }