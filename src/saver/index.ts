import * as BABYLON from 'babylonjs';
//import * as download from 'downloadjs';
import * as xmlBuilder from 'xmlbuilder';
import DataModel from '../data-model';

export default class WorldGenerator{
    constructor(
        private scene:BABYLON.Scene,
        private dataModel:DataModel
    ){}


    createXml(){

            this.scene;
            this.dataModel;


            const world = xmlBuilder.create('world');
            world.attribute('version', '0.1');
            const head = world.element('head');head;
            head.element('meta')
                .attribute('name', 'creator')
                .attribute('content', window.location.hostname);


            //todo player
            //const player = world.element('player');
            //const spells = player.element('spells');spells;


            const scenes = world.element('scenes');
            const scene1 = scenes.element('scene');
            //const scene1materials = scene1.element('materials');
            const scene1objects = scene1.element('objects');
            for(const mesh of this.scene.meshes){
                scene1objects.element('object', {
                    shape: "cube",
                    material: "stone",
                    size: 'aaaa',
                    position: `${mesh.position.x},${mesh.position.y},${mesh.position.z}`,
                });
            }

            return world.end({ pretty: true});


    }



    downloadXml(){
        alert(this.createXml());
        //download(this.createXml(), "WebAppGames.xml", "text/xml");
    }



}