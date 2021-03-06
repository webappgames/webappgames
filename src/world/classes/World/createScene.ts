import * as BABYLON from 'babylonjs';

export default function createScene(engine:BABYLON.Engine):BABYLON.Scene{
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(1, 0, 0, 0);
    const gravityVector = new BABYLON.Vector3(0,-100, 0);
    const physicsPlugin = new BABYLON.OimoJSPlugin();
    scene.enablePhysics(gravityVector, physicsPlugin);

    //scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    //BABYLON.Scene.FOGMODE_NONE;
    //BABYLON.Scene.FOGMODE_EXP;
    //BABYLON.Scene.FOGMODE_EXP2;
    //BABYLON.Scene.FOGMODE_LINEAR;
    //scene.fogColor = BABYLON.Color3.FromStringHex('');
    //scene.fogDensity = 0.01;

    return scene;
}