export default function setControlls(canvasElement:HTMLCanvasElement,rotateCameraBy:(alpha:number,beta:number)=>void){


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
        rotateCameraBy(
             y/500
            ,x/500
        );

    }





}