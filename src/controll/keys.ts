//todo maybe use RxJS

/*
const KEYMAP = {
    'UP': [38, 87],
    'DOWN': [40, 83],
    'LEFT': [37, 65],
    'RIGHT': [39, 68],
    'JUMP': [32],
};



//------------------------------------------------------------


var controls_down = {
    update: function () {
        for (var control in KEYMAP) {

            this[control] = false;

            for (var i = 0, l = keys.length; i < l; i++) {

                if (KEYMAP[control].indexOf(keys[i]) !== -1) {

                    this[control] = true;

                }

            }

        }
    }
};*/



class Subscriber{
    constructor(public keyCode:number,public callback:Function){
    }
}




const keysDown:number[] = [];
const subscribers:Subscriber[] = [];//todo event type







window.addEventListener('keydown', function (event) {
        if (keysDown.indexOf(event.keyCode) === -1) {
            keysDown.push(event.keyCode);

            subscribers.forEach((subscriber:Subscriber)=>{
                if(subscriber.keyCode == event.keyCode){
                    subscriber.callback.call(null);
                }
            })
        }
});



window.addEventListener('keyup', function (event) {


    var i = keysDown.indexOf(event.keyCode);


    if (i != -1) {
        keysDown.splice(i, 1);


    }

});



export function isDown(keyCode:number):boolean{
    return false;//todo
}

//todo unsubscribe
//todo event type in param
export function subscribeToPress(keyCode:number,callback:Function){//todo unsubscribe
    subscribers.push(new Subscriber(keyCode,callback));
}


