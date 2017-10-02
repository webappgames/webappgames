import * as BABYLON from 'babylonjs';
//import * as download from 'downloadjs';
import * as xmlBuilder from 'xmlbuilder';
import {DOMParser} from 'xmldom';
import DataModel from '../data-model';

function vectorToString(vector:BABYLON.Vector3):string{
    const values:string[] = [];
    for(const axis of ['x','y','z']){
        values.push((Math.round(vector[axis]*1000)/1000).toString());
    }
    return values.join(',');
}

function vectorFromString(vectorString:string):BABYLON.Vector3{
    const values = vectorString.split(',').map((value)=>parseFloat(value));
    if(values.length===3) {
        return new BABYLON.Vector3(values[0],values[1],values[2]);
    }else{
        throw new Error(`Can not create vector from string "${vectorString}".`)
    }
}

function findNode(parent:Element,tagName:string):Element{
    for(const child of parent.childNodes as any){
        if(child.tagName===tagName){
            return child;
        }
    }
    console.log(parent);
    throw new Error(`Thare is no child element with tagname "${tagName}".`);
}

export default class WorldGenerator{
    constructor(
        private scene:BABYLON.Scene,
        private dataModel:DataModel
    ){}

    //todo maybe inject playerMesh to this class via constructor (not find by name)
    getPlayer():BABYLON.AbstractMesh{
        const playerMesh = this.scene.meshes.find((mesh)=>mesh.name==='player');
        if(playerMesh instanceof BABYLON.AbstractMesh) {
            return playerMesh;
        }else{
            throw new Error('In scene is no player.');
        }
    }

    createXml(pretty=true){

            this.scene;
            this.dataModel;


            const world = xmlBuilder.create('world');
            world.attribute('version', '0.1');
            const head = world.element('head');head;
            head.element('meta')
                .attribute('name', 'creator')
                .attribute('content', window.location.hostname);


            const playerMesh = this.getPlayer();
            if(playerMesh instanceof BABYLON.AbstractMesh) {
                const player = world.element('player', {
                    position: vectorToString(playerMesh.position),
                    'velocity-linear': vectorToString(playerMesh.physicsImpostor.getLinearVelocity()),
                    'velocity-angular': vectorToString(playerMesh.physicsImpostor.getAngularVelocity()),
                });
                player;
                //const spells = player.element('spells');spells;
            }



            const scenes = world.element('scenes');
            const scene1 = scenes.element('scene');
            //const scene1materials = scene1.element('materials');
            const scene1objects = scene1.element('objects');
            for(const mesh of this.scene.meshes){

                if(
                    mesh.name!=='ground'&&
                    mesh.material instanceof BABYLON.StandardMaterial &&
                    mesh.physicsImpostor instanceof BABYLON.PhysicsImpostor
                ){


                    scene1objects.element('object', {
                        shape: "block",//todo real shape
                        material: mesh.material.name,
                        size: vectorToString(mesh.scaling),
                        position: vectorToString(mesh.position),
                        'velocity-linear': vectorToString(mesh.physicsImpostor.getLinearVelocity()),
                        'velocity-angular': vectorToString(mesh.physicsImpostor.getAngularVelocity()),
                    });

                }

            }

            return world.end({pretty});


    }


    loadXml(xml:string){
        const world = new DOMParser().parseFromString(xml).documentElement;

        if(world.tagName!='world'){

            throw new Error(`Document element must be "world not ${world.tagName}".`);
        }else{
            switch(world.attributes.getNamedItem('version').value){
                case '0.1':

                    //const playerMesh = this.getPlayer();

                    for(const child of world.childNodes as any){
                        switch(child.tagName){
                            case 'player':
                                //todo playerMesh.position = vectorFromString(child.attributes.getNamedItem('position').value);
                                break;
                            case 'scenes':


                                const scene =findNode(child,'scene');
                                const objects =findNode(scene,'objects');

                                console.log(objects);
                                for(const object of objects.childNodes as any){
                                    if(object.tagName==='object'){

                                        const mesh = BABYLON.Mesh.CreateBox("box", 1, this.scene);
                                        mesh.scaling = vectorFromString(object.attributes.getNamedItem('size').value);
                                        mesh.position = vectorFromString(object.attributes.getNamedItem('position').value);
                                        //this.materialFactory.applyMaterial(billboard,"itnetwork_summer_2017");


                                    }
                                }
                                break;
                        }
                    }


            }
        }

    }


    load(){
        const xml = localStorage.getItem('save') as string;
        //console.log(xml);
        this.loadXml(xml);
    }


    save(){
        localStorage.setItem('save',this.createXml())
    }


    /*downloadXml(){
        download;
        alert(this.createXml());
        //download(this.createXml(), "WebAppGames.xml", "text/xml");
    }*/



}