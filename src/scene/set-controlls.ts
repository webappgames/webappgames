import {subscribeKeys,SubscriberModes} from '../controll/keys';
import * as BABYLON from 'babylonjs';
import {KEYMAP,PLAYER} from '../config';

export default function setControlls(canvasElement:HTMLCanvasElement,rotatePlayerBy:(alpha:number,beta:number)=>void,addPlayerVelocity:(vector:BABYLON.Vector3)=>void){


    canvasElement.onclick = function() {
        canvasElement.requestPointerLock();
    };



    if ("onpointerlockchange" in document) {
        document.addEventListener('pointerlockchange', lockChangeAlert, false);
    } else if ("onmozpointerlockchange" in document) {
        document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
    }

    function lockChangeAlert() {
        if(document.pointerLockElement === canvasElement) {
            console.log('The pointer lock status is now locked');
            document.addEventListener("mousemove", updatePosition, false);
        } else {
            console.log('The pointer lock status is now unlocked');
            document.removeEventListener("mousemove", updatePosition, false);
        }
    }



    function updatePosition(e:any) {
        const   x = e.movementX,
                y = e.movementY;
        rotatePlayerBy(
             y/500
            ,x/500
        );

    }


    subscribeKeys(KEYMAP.JUMP,SubscriberModes.PRESS,()=>{

        addPlayerVelocity(new BABYLON.Vector3(0,PLAYER.SPEED.JUMP,0));

    });




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


}