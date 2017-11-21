//import log from '../../tools/log';
import * as BABYLON from 'babylonjs';
import AbstractBrick from './AbstractBrick';

export default class Brick extends AbstractBrick {

    createBabylonMesh() {


        this.mesh = BABYLON.Mesh.CreateGround("ground", 1000, 1000, 2, this.world.scene);
        this.mesh.physicsImpostor = new BABYLON.PhysicsImpostor(this.mesh, BABYLON.PhysicsImpostor.BoxImpostor, {
            mass: 0,
            restitution: 0.1
        }, this.world.scene);


        //todo unregister after dispose
        this.world.scene.registerAfterRender(() => {
            this.world.scene.meshes.forEach((mesh) => {
                if ('physicsImpostor' in mesh) {
                    if (mesh.position.y < 0) {
                        mesh.physicsImpostor.sleep();
                        mesh.position = new BABYLON.Vector3(
                            mesh.position.x,
                            0,
                            mesh.position.z
                        );
                        mesh.physicsImpostor.wakeUp();
                    }
                }
                ;
            });
        });


    }


    set materialName(materialName: string) {
        this.world.materialFactory.getMaterial(materialName).then((material) => {
            this.mesh.material = material.babylonMaterial;
            const texture = ((this.mesh.material as BABYLON.StandardMaterial).diffuseTexture as BABYLON.Texture);
            texture.uScale = 100;
            texture.vScale = 100;

            //todo unregister after dispose
            this.world.scene.registerBeforeRender(() => {

                this.mesh.position.x = this.world.player.mesh.position.x;
                this.mesh.position.z = this.world.player.mesh.position.z;

                texture.uOffset = this.mesh.position.x / 10;
                texture.vOffset = this.mesh.position.z / 10

            });

        });
    }

}


