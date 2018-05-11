/*
import * as BABYLON from 'babylonjs';
import World from "../World";

export default function createCamera(world: World): BABYLON.FreeCamera|BABYLON.WebVRFreeCamera {
    if (!world.webVR) {

        console.log(`Creating FreeCamera.`);
        const camera = new BABYLON.FreeCamera("camera", BABYLON.Vector3.Zero(), world.scene);
        camera.fov = 1.2;
        return camera;

    } else {

        console.log(`Creating WebVRFreeCamera.`);
        const camera = new BABYLON.WebVRFreeCamera("camera", BABYLON.Vector3.Zero(), world.scene);
        //todo do not split screen
        
        world.scene.onPointerDown = function () {
            camera.getEngine().enableVR();
            //camera.attachControl(world.canvasElement, true);
        };
        return camera;

    }
}*/