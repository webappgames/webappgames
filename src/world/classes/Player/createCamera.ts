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
        world.scene.onPointerDown = function () {
            //todo camera.getEngine().enableVR();
            camera.attachControl(world.canvasElement, true);
        };
        console.log(camera.onControllersAttachedObservable);

        camera.onControllersAttachedObservable.add((controllers) => {


            console.log('controllers', controllers);
            controllers.forEach((controller, i) => {

                console.log(`controller ${i}`, controller);

                controller.onTriggerStateChangedObservable.add((gamepadButton) => {
                    //console.log('onTriggerStateChangedObservable', gamepadButton);

                    controller.browserGamepad.hapticActuators.forEach((hapticActuator: any)=>hapticActuator.pulse(gamepadButton.value,1000));//todo as type use GamepadHapticActuator


                    if(gamepadButton.value===1){
                        

                        console.log('onTriggerStateChangedObservable', gamepadButton);
                    }
                });

                controller.onMainButtonStateChangedObservable.add((gamepadButton) => {
                    //console.log('onMainButtonStateChangedObservable', gamepadButton);
                });

                controller.onSecondaryButtonStateChangedObservable.add((gamepadButton) => {
                    //console.log('onSecondaryButtonStateChangedObservable', gamepadButton);
                });


                controller.onPadStateChangedObservable.add((gamepadButton) => {
                    //console.log('onPadStateChangedObservable', gamepadButton);
                });

                controller.onPadValuesChangedObservable.add((gamepadButton) => {
                    //console.log('onPadValuesChangedObservable', gamepadButton);
                });


                const controllerMesh = BABYLON.Mesh.CreateSphere("SphereBrick", 16, 0.1, world.scene);
                controllerMesh.scaling.z = 10;

                controllerMesh.setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0.02));


                const lines = BABYLON.MeshBuilder.CreateLines(
                    "lines",
                    {
                        points: [
                            new BABYLON.Vector3(0, 0, 0),
                            new BABYLON.Vector3(0, 0, -1000)
                            ],
                        //colors: [BABYLON.Color4.FromHexString('#ffff0055')]
                    } as any,//todo color of line
                    world.scene
                );
                lines.parent = controllerMesh;


                //controllerMesh.position = controller.devicePosition;

                function updatePositon() {

                    /*const {x,y,z,w} = controller.deviceRotationQuaternion.scale(-1);
                    const direction = new BABYLON.Vector3(
                       2 * (x * z - w * y),
                    2 * (y * z + w * x),
                    1 - 2 * (x * x + y * y)
                    );*/


                    controllerMesh.position =
                        controller.devicePosition
                    /* .add(
                         direction
                             .scale(1)
                     );*/
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