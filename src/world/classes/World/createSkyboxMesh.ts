import * as BABYLON from 'babylonjs';

export default function createSkyboxMesh(
    scene: BABYLON.Scene
):BABYLON.AbstractMesh{
    const skyboxMesh = BABYLON.Mesh.CreateBox("skyBox", 1000, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(process.env.PUBLIC_URL +"/assets/skyboxes/TropicalSunnyDay/TropicalSunnyDay", scene, ["_ft.jpg", "_up.jpg", "_rt.jpg", "_bk.jpg", "_dn.jpg", "_lf.jpg"]);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skyboxMesh.material = skyboxMaterial;

    //skyboxMesh.renderingGroupId = 1;
    //skyboxMesh.applyFog = false;
    skyboxMesh.infiniteDistance = true;
    skyboxMaterial.disableLighting = true;



    /*scene.registerBeforeRender(()=>{
        skyboxMesh.position = player.mesh.position;
    });*/

    return skyboxMesh;
}