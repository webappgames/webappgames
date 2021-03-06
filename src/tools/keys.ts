//todo create class not singleton

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



function executeSubscribers(subscribers:Subscriber[],keyCode:number,execute=true):boolean{

    let anySubsciberExecuted = false;
    subscribers.forEach((subscriber:Subscriber)=>{
        if(subscriber.keyCodes.some((keyCodeOfSubscriber)=>keyCodeOfSubscriber === keyCode)){
            if(execute)subscriber.callback.call(null);
            anySubsciberExecuted = true;
        }
    })

    return anySubsciberExecuted;

}





window.addEventListener('keydown', function (event) {
        if (keysDown.indexOf(event.keyCode) === -1) {
            keysDown.push(event.keyCode);
            executeSubscribers(subscribersPress,event.keyCode)

            //todo inly in debug mode
            if(
                !executeSubscribers(subscribersPress,event.keyCode,false) &&
                !executeSubscribers(subscribersRelease,event.keyCode,false) &&
                !executeSubscribers(subscribersFrame,event.keyCode,false)
            ){
                console.log('Pressed unknown key.',event.keyCode);
            }

        }
});



window.addEventListener('keyup', function (event) {


    var i = keysDown.indexOf(event.keyCode);


    if (i != -1) {
        keysDown.splice(i, 1);
        executeSubscribers(subscribersRelease,event.keyCode);
    }

});



function frame(){

    keysDown.forEach((keyDownCode)=>executeSubscribers(subscribersFrame,keyDownCode));


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
        case SubscriberModes.FRAME://todo when on Frame send ms as param
            subscribersFrame.push(new Subscriber(keyCodes,callback));
            break;
    }
}


