import {subscribeKeys,SubscriberModes} from '../tools/keys';
import * as BABYLON from 'babylonjs';
import {KEYMAP,PLAYER} from '../config';

export default function setControlls(
    canvasElement:HTMLCanvasElement,
    onClick:(event:PointerEvent)=>void,
    rotatePlayerBy:(alpha:number,beta:number)=>void,
    addPlayerVelocity:(vector:BABYLON.Vector3)=>void
){

    //todo add event listener
    canvasElement.addEventListener("pointerdown",
        (event)=>{
            if(document.pointerLockElement !== canvasElement) {
                canvasElement.requestPointerLock();
            }else{
                onClick(event);
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
            document.addEventListener("mousemove", mouseMoveLocked, false);
            //document.removeEventListener("mousemove", mouseMoveUnlocked, false);
        } else {
            //The pointer lock status is now unlocked
            //document.addEventListener("mousemove", mouseMoveUnlocked, false);
            document.removeEventListener("mousemove", mouseMoveLocked, false);
        }
    }



    function mouseMoveLocked(event:MouseEvent) {
        const   x = event.movementX,
                y = event.movementY;
        rotatePlayerBy(
             y/500
            ,x/500
        );

    }


    /*function mouseMoveUnlocked(event:MouseEvent) {
        return scene.pick(event.clientX,event.clientY, (mesh)=>{
            return mesh !== playerMesh;
        });
    }*/

    //todo here should be spell execution




    subscribeKeys(KEYMAP.FORWARD,SubscriberModes.FRAME,()=>{

        addPlayerVelocity(new BABYLON.Vector3(PLAYER.SPEED.FORWARD,0,0));

    });
    subscribeKeys(KEYMAP.BACKWARD,SubscriberModes.FRAME,()=>{

        addPlayerVelocity(new BABYLON.Vector3(-PLAYER.SPEED.BACKWARD,0,0));

    });
    subscribeKeys(KEYMAP.LEFT,SubscriberModes.FRAME,()=>{

        addPlayerVelocity(new BABYLON.Vector3(0,0,PLAYER.SPEED.SIDE));

    });
    subscribeKeys(KEYMAP.RIGHT,SubscriberModes.FRAME,()=>{

        addPlayerVelocity(new BABYLON.Vector3(0,0,-PLAYER.SPEED.SIDE));

    });




    subscribeKeys(KEYMAP.JUMP,SubscriberModes.PRESS,()=>{

        addPlayerVelocity(new BABYLON.Vector3(0,PLAYER.SPEED.JUMP,0));

    });



}