import * as BABYLON from 'babylonjs';
import MaterialFactory from './../MaterialFactory';
import Player from '../Player';

export default function createGroundMesh(
    scene:BABYLON.Scene,
    player:Player,
    materialFactory:MaterialFactory
):BABYLON.AbstractMesh{
    const groundMesh = BABYLON.Mesh.CreateGround("ground", 1000, 1000, 2, scene);
    groundMesh.material = materialFactory.getMaterial('grass',100);
    groundMesh.physicsImpostor = new BABYLON.PhysicsImpostor(groundMesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.1}, scene);


    scene.registerBeforeRender(()=>{

        //!todo skyboxMesh.position = position;

        groundMesh.position.x = player.mesh.position.x;
        groundMesh.position.z = player.mesh.position.z;

        ((groundMesh.material as BABYLON.StandardMaterial).diffuseTexture as BABYLON.Texture).uOffset = groundMesh.position.x/10;
        ((groundMesh.material as BABYLON.StandardMaterial).diffuseTexture as BABYLON.Texture).vOffset = groundMesh.position.z/10;

    });


    scene.registerAfterRender(()=>{
        scene.meshes.forEach((mesh)=> {
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


    return groundMesh;
}