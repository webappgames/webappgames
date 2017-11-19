import log from '../../tools/log';
import * as BABYLON from 'babylonjs';
//import * as _ from 'lodash';
//import {countVolume} from '../../tools/babylon';

export default class SoundFactory{


    private _soundsCache:BABYLON.Sound[];


    constructor(
        private _scene:BABYLON.Scene
    ){
        this._soundsCache = [];
    }


    getSound(
        soundName:string
    ):BABYLON.Sound{


        const cashedSound = this._soundsCache.find((sound)=>sound.name === soundName)||null;

        if(cashedSound){
            return cashedSound


        }else {
            console.log(`Creating sound "${soundName}".`);

            const sound = new BABYLON.Sound(soundName, `${process.env.PUBLIC_URL}/assets/sound/${soundName}.mp3`, this._scene, undefined, {
                loop: false,
                useCustomAttenuation: true
            });
            sound.setAttenuationFunction((currentVolume, currentDistance, maxDistance, refDistance, rolloffFactor)=>{
                return currentVolume / currentDistance * maxDistance;
            });

            //this._soundsCache.push(sound);
            return sound;
        }


    }

    getMeshSound(
        soundName:string,
        attachMesh:BABYLON.AbstractMesh

    ):BABYLON.Sound{
        const sound = this.getSound(soundName);//.clone();
        sound.attachToMesh(attachMesh);
        return sound;
    }

}


