//import log from '../../tools/log';
import * as BABYLON from 'babylonjs';
import AbstractBrick from './AbstractBrick';
import Structure from '../Structure';

const GROUND_SIZE = 1000;
const GROUND_TEXTURE_SCALE = 50;

export default class Brick extends AbstractBrick {

    createBabylonMesh() {

        this.mesh = BABYLON.Mesh.CreateGround("ground", GROUND_SIZE, GROUND_SIZE, 2, this.world.scene);

        //-------------
        //todo unregister after dispose
        this.world.scene.registerAfterRender(() => {
            this.world.scene.meshes.forEach((mesh) => {
                if (mesh.physicsImpostor) {
                    if (mesh.position.y < 0) {
                        mesh.physicsImpostor!.sleep();
                        mesh.position = new BABYLON.Vector3(
                            mesh.position.x,
                            0,
                            mesh.position.z
                        );
                        mesh.physicsImpostor!.wakeUp();
                    }
                }
                ;
            });
        });
        //-------------
    }

    applyStructure(structure:Structure){
        super.applyStructure(structure);

        //-------------
        for (const textureType of ['diffuse','bump']) {
            const texture = (this.mesh.material![textureType+'Texture'] as BABYLON.Texture);
            texture.uScale = GROUND_TEXTURE_SCALE;
            texture.vScale = GROUND_TEXTURE_SCALE;
        }

        //todo unregister after dispose
        /*todo
        this.world.scene.registerBeforeRender(() => {

            this.mesh.position.x = this.world.player.mesh.position.x;
            this.mesh.position.z = this.world.player.mesh.position.z;

            for (const textureType of ['diffuse','bump']) {
                const texture = (this.mesh.material![textureType + 'Texture'] as BABYLON.Texture);
                texture.uOffset = this.mesh.position.x / GROUND_SIZE * GROUND_TEXTURE_SCALE;
                texture.vOffset = this.mesh.position.z / GROUND_SIZE * GROUND_TEXTURE_SCALE;
            }

        });*/

        //-------------

        //-------------
        this.mesh.physicsImpostor = new BABYLON.PhysicsImpostor(this.mesh, BABYLON.PhysicsImpostor.BoxImpostor, {
            mass: 0,
            restitution: 0
        }, this.world.scene);
        //-------------

    }


    get physicsImpostor():number {
        return BABYLON.PhysicsImpostor.BoxImpostor;
    }

}


