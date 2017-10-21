import * as BABYLON from 'babylonjs';
import MaterialFactory from './../MaterialFactory';

export default function createGroundMesh(
    scene:BABYLON.Scene,
    playerMesh:BABYLON.AbstractMesh,
    materialFactory:MaterialFactory
):BABYLON.AbstractMesh{
    const groundMesh = BABYLON.Mesh.CreateGround("ground", 1000, 1000, 2, scene);
    groundMesh.material = materialFactory.getMaterial('grass',100);
    groundMesh.physicsImpostor = new BABYLON.PhysicsImpostor(groundMesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.1}, scene);
    scene.registerBeforeRender(()=>{

        //!todo skyboxMesh.position = position;

        groundMesh.position.x = playerMesh.position.x;
        groundMesh.position.z = playerMesh.position.z;

        ((groundMesh.material as BABYLON.StandardMaterial).diffuseTexture as BABYLON.Texture).uOffset = groundMesh.position.x/10;
        ((groundMesh.material as BABYLON.StandardMaterial).diffuseTexture as BABYLON.Texture).vOffset = groundMesh.position.z/10;

    });
    return groundMesh;
}