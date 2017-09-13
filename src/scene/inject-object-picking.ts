import * as BABYLON from 'babylonjs';

//todo not groundMesh but pickable objects
export default function injectObjectPicking(scene:BABYLON.Scene,groundMesh:BABYLON.AbstractMesh){

    const canvas = scene.getEngine().getRenderingCanvas();
    const camera = scene.activeCamera;


    let itemMesh:BABYLON.AbstractMesh|null = null;
    let rotation:number;


    function onPointerDown() {

        var pickInfo = scene.pick(canvas.width / 2, canvas.height / 2, (mesh)=>{
            return mesh !== groundMesh;
        });
        if (pickInfo.hit) {
            itemMesh = pickInfo.pickedMesh;
            rotation = pickInfo.pickedMesh.rotation.y;
        }
    }





    function onPointerMove() {
        if(itemMesh) {
            var pickInfo = scene.pick(canvas.width / 2, canvas.height / 2, (mesh)=>{
                return mesh !== itemMesh;
            });
            if (pickInfo.hit) {
                const point = pickInfo.pickedPoint;
                itemMesh.position = point;
                itemMesh.rotation.y = camera.rotation.y+rotation;
            }
        }
    }



    function onPointerUp() {
        itemMesh = null;
    }

    canvas.addEventListener("pointerdown", onPointerDown, false);
    canvas.addEventListener("pointermove", onPointerMove, false);
    canvas.addEventListener("pointerup", onPointerUp, false);

    scene.onDispose = function () {
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerup", onPointerUp);
    }


}