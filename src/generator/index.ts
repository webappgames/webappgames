import * as BABYLON from 'babylonjs';
import MaterialFactory from '../scene/classes/MaterialFactory';


export default class WorldGenerator{
    constructor(
        private materialFactory:MaterialFactory,
        private scene:BABYLON.Scene
    ){}


    generateWorld(){

        for (let i = 0; i < 15; i++) {
            const boxMesh = BABYLON.Mesh.CreateBox("box", 1, this.scene);
            boxMesh.scaling = new BABYLON.Vector3(20, 80, 8);
            boxMesh.position = new BABYLON.Vector3(0, 40, i*40);
            boxMesh.material = this.materialFactory.getMaterial('stone-plain');


            boxMesh.physicsImpostor = new BABYLON.PhysicsImpostor(boxMesh, BABYLON.PhysicsImpostor.BoxImpostor, {
                mass: 10,
                restitution: 0.2
            }, this.scene);

        }
        for (let i = 0; i < 15; i++) {
            const boxMesh = BABYLON.Mesh.CreateBox("box", 1, this.scene);
            boxMesh.scaling = new BABYLON.Vector3(8, 80, 20);
            boxMesh.position = new BABYLON.Vector3(i*40, 40 , 40);
            boxMesh.material = this.materialFactory.getMaterial('stone-plain');


            boxMesh.physicsImpostor = new BABYLON.PhysicsImpostor(boxMesh, BABYLON.PhysicsImpostor.BoxImpostor, {
                mass: 10,
                restitution: 0.2
            }, this.scene);

        }


    }




}