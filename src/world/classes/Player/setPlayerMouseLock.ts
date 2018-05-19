/*import UIDataModel from '../../../ui/UIDataModel';
import * as BABYLON from 'babylonjs';

export default function setPlayerMouseLock(
    canvasElement:HTMLCanvasElement,
    camera:BABYLON.FreeCamera,
    //onClick:(event:PointerEvent)=>void,
    uiDataModel:UIDataModel
){

    console.log(`Setting player mouse lock.`);

    //todo add event listener
    canvasElement.addEventListener("pointerdown",
        (event)=>{
            if(document.pointerLockElement !== canvasElement) {
                canvasElement.requestPointerLock();
            }
        }
        , false);



    //todo prevent spell creating when locking cursor
    if ("onpointerlockchange" in document) {
        document.addEventListener('pointerlockchange', lockChangeAlert, false);
    } else if ("onmozpointerlockchange" in document) {
        document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
    }

    function lockChangeAlert() {
        if(document.pointerLockElement === canvasElement) {
            //The pointer lock status is now locked
            uiDataModel.locked=true;
            document.addEventListener("mousemove", mouseMoveLocked, false);
            //document.removeEventListener("mousemove", mouseMoveUnlocked, false);
        } else {
            //The pointer lock status is now unlocked
            uiDataModel.locked=false;
            //document.addEventListener("mousemove", mouseMoveUnlocked, false);
            document.removeEventListener("mousemove", mouseMoveLocked, false);
        }
    }


    //todo to config
    const cameraRotationAlphaLimitMin = Math.PI * -.5 * .9;
    const cameraRotationAlphaLimitMax = Math.PI * 0.5 * .9;

    function mouseMoveLocked(event:MouseEvent) {
        const x = event.movementX;
        const    y = event.movementY;
        let alpha = y / 1500;
        let  beta = x / 1500;

        if (alpha < cameraRotationAlphaLimitMin) alpha = cameraRotationAlphaLimitMin;
        if (alpha > cameraRotationAlphaLimitMax) alpha = cameraRotationAlphaLimitMax;
        alpha;beta;

        camera.cameraRotation.x += alpha;
        camera.cameraRotation.y += beta;

    }

}*/