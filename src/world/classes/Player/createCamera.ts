import * as BABYLON from 'babylonjs';
import World from "../World";

export default function createCamera(world: World): BABYLON.FreeCamera {
    if (!world.webVR) {

        console.log(`Creating FreeCamera.`);
        const camera = new BABYLON.FreeCamera("camera", BABYLON.Vector3.Zero(), world.scene);
        camera.fov = 1.2;
        return camera;

    } else {

        console.log(`Creating WebVRFreeCamera.`);
        const camera = new BABYLON.WebVRFreeCamera("camera", BABYLON.Vector3.Zero(), world.scene);
        world.scene.onPointerDown = function () {
            camera.attachControl(world.canvasElement, true);
        };

        //todo is thare observable?
        camera.onControllersAttached = ((controllers) => {


            console.log('controllers', controllers);
            controllers.forEach((controller, i) => {

                console.log(`controller ${i}`, controller);

                controller.onTriggerStateChangedObservable.add((gamepadButton) => {
                    console.log('onTriggerStateChangedObservable', gamepadButton);
                });

                controller.onMainButtonStateChangedObservable.add((gamepadButton) => {
                    console.log('onMainButtonStateChangedObservable', gamepadButton);
                });

                controller.onSecondaryButtonStateChangedObservable.add((gamepadButton) => {
                    console.log('onSecondaryButtonStateChangedObservable', gamepadButton);
                });


                controller.onPadStateChangedObservable.add((gamepadButton) => {
                    console.log('onPadStateChangedObservable', gamepadButton);
                });

                controller.onPadValuesChangedObservable.add((gamepadButton) => {
                    console.log('onPadValuesChangedObservable', gamepadButton);
                });


                const controllerMesh = BABYLON.Mesh.CreateSphere("SphereBrick", 16, 0.2, world.scene);
                controllerMesh.scaling.z = 10;

                //controllerMesh.position = controller.devicePosition;

                function updatePositon() {
                    controllerMesh.position = controller.devicePosition;//.scale(4);
                    controllerMesh.rotationQuaternion = controller.deviceRotationQuaternion;
                    /*drawingTool.update(new DrawingPoint(
                        controller.devicePosition,
                        controller.deviceRotationQuaternion,
                        intensity
                    ));*/
                    requestAnimationFrame(updatePositon);
                }

                updatePositon();


            });


            //console.log('onControllersAttachedObservable',controllers);
        });

        return camera;

    }
}