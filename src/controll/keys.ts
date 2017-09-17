class Subscriber{
    constructor(public keyCodes:number[],public callback:Function){
    }
}

export enum SubscriberModes{
    PRESS, RELEASE, FRAME
}


const subscribersPress:Subscriber[] = [];
const subscribersRelease:Subscriber[] = [];
const subscribersFrame:Subscriber[] = [];





const keysDown:number[] = [];







window.addEventListener('keydown', function (event) {
        if (keysDown.indexOf(event.keyCode) === -1) {
            keysDown.push(event.keyCode);

            //todo duplicite
            subscribersPress.forEach((subscriber:Subscriber)=>{
                if(subscriber.keyCodes.some((keyCode)=>keyCode == event.keyCode)){
                    subscriber.callback.call(null);
                }
            })
        }
});



window.addEventListener('keyup', function (event) {


    var i = keysDown.indexOf(event.keyCode);


    if (i != -1) {
        keysDown.splice(i, 1);

        //todo duplicite
        subscribersRelease.forEach((subscriber:Subscriber)=>{
            if(subscriber.keyCodes.some((keyCode)=>keyCode == event.keyCode)){
                subscriber.callback.call(null);
            }
        })


    }

});



function frame(){

    keysDown.forEach((keyDownCode)=>{

        //todo duplicite
        subscribersFrame.forEach((subscriber:Subscriber)=>{
            if(subscriber.keyCodes.some((keyCode)=>keyCode == keyDownCode)){
                subscriber.callback.call(null);
            }
        });


    });


    requestAnimationFrame(frame);
}
frame();



/*
export function isDown(keyCodes:number[]):boolean{
    return false;
}*/



//todo unsubscribe
export function subscribeKeys(keyCodes:number[],mode:SubscriberModes,callback:Function){

    switch(mode){
        case SubscriberModes.PRESS:
            subscribersPress.push(new Subscriber(keyCodes,callback));
            break;
        case SubscriberModes.RELEASE:
            subscribersRelease.push(new Subscriber(keyCodes,callback));
            break;
        case SubscriberModes.FRAME:
            subscribersFrame.push(new Subscriber(keyCodes,callback));
            break;
    }
}


