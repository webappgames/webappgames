// import * as BABYLON from 'babylonjs';
// import Spell from '../../AbstractSpell';
//
// export default class AbstractResize extends Spell{
//     execute(){
//
//
//         const boxMesh = BABYLON.Mesh.CreateBox("box", 1, this.scene);
//         boxMesh.position = this.targetMesh.position.clone();
//         boxMesh.scaling = this.targetMesh.scaling.scale(this.scaling);
//         boxMesh.rotation = this.targetMesh.rotation.clone();
//         boxMesh.material = this.targetMesh.material.clone('clonedMaterial');
//
//         this.targetMesh.dispose();
//
//         boxMesh.physicsImpostor = new BABYLON.PhysicsImpostor(boxMesh, BABYLON.PhysicsImpostor.BoxImpostor, {
//             mass: 10,
//             restitution: 0.2
//         }, this.scene);
//
//
//     }
//     get scaling():number{
//         return 1;
//     }
// }