import * as BABYLON from 'babylonjs';
import World from '../scene/classes/World';
//import * as download from 'downloadjs';
import * as xmlBuilder from 'xmlbuilder';
import {DOMParser} from 'xmldom';
import DataModel from '../data-model';
import {isNull} from "util";

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
        private world:World,
        private dataModel:DataModel
    ){}


    createXml(pretty=true){

            this.world;
            this.dataModel;


            const world = xmlBuilder.create('world');
            world.attribute('version', '0.1');
            const head = world.element('head');head;
            head.element('meta')
                .attribute('name', 'creator')
                .attribute('content', window.location.hostname);



            world.element('player', {
                position: vectorToString(this.world.playerMesh.position),
                //todo rotation: vectorToString(this.world.playerMesh.rotation),
                'velocity-linear': vectorToString(this.world.playerMesh.physicsImpostor.getLinearVelocity()),
                'velocity-angular': vectorToString(this.world.playerMesh.physicsImpostor.getAngularVelocity()),
            });




            const scenes = world.element('scenes');
            const scene1 = scenes.element('scene');
            //const scene1materials = scene1.element('materials');
            const scene1objects = scene1.element('objects');
            for(const mesh of this.world.meshes){
                scene1objects.element('object', {
                    shape: "block",//todo real shape
                    material: mesh.material.name,
                    size: vectorToString(mesh.scaling),
                    position: vectorToString(mesh.position),
                    rotation: vectorToString(mesh.rotationQuaternion.toEulerAngles()),
                    'velocity-linear': vectorToString(mesh.physicsImpostor.getLinearVelocity()),
                    'velocity-angular': vectorToString(mesh.physicsImpostor.getAngularVelocity()),
                });
            }

            return world.end({pretty});


    }


    loadXml(xml:string){
        const world = new DOMParser().parseFromString(xml).documentElement;

        if(world.tagName!='world'){

            throw new Error(`Document element must be "world not ${world.tagName}".`);
        }else{
            this.world.cleanScene();

            switch(world.attributes.getNamedItem('version').value){
                case '0.1':

                    //const playerMesh = this.getPlayer();

                    for(const child of world.childNodes as any){
                        switch(child.tagName){
                            case 'player':
                                //todo DRY
                                this.world.playerMesh.position = vectorFromString(child.attributes.getNamedItem('position').value);
                                //todo this.world.playerMesh.rotation = vectorFromString(child.attributes.getNamedItem('rotation').value);
                                //todo 2x velocity
                                break;
                            case 'scenes':

                                const scene =findNode(child,'scene');
                                const objects =findNode(scene,'objects');

                                //console.log(objects);
                                for(const object of objects.childNodes as any){
                                    if(object.tagName==='object'){

                                        const mesh = BABYLON.Mesh.CreateBox("box", 1, this.world.scene);
                                        //todo DRY
                                        mesh.scaling = vectorFromString(object.attributes.getNamedItem('size').value);
                                        mesh.position = vectorFromString(object.attributes.getNamedItem('position').value);
                                        mesh.rotation = vectorFromString(object.attributes.getNamedItem('rotation').value);

                                        this.world.materialFactory.applyMaterial(mesh,object.attributes.getNamedItem('material').value);
                                        mesh.physicsImpostor.setLinearVelocity(vectorFromString(object.attributes.getNamedItem('velocity-linear').value));
                                        mesh.physicsImpostor.setAngularVelocity(vectorFromString(object.attributes.getNamedItem('velocity-angular').value));


                                    }
                                }
                                break;
                        }
                    }


            }
        }

    }

    public SAVE_PREFIX = 'webappgames-save-';
    load(saveId:string){
        const xml = localStorage.getItem(this.SAVE_PREFIX+saveId);
        if(isNull(xml)){
            throw new Error(`Save "${saveId}" does not exists.`);
        }else{
            this.loadXml(xml);
        }
    }

    save(saveId:string|null = null){
        if(saveId===null){
            saveId = new Date().toLocaleString('en');
        }
        localStorage.setItem(this.SAVE_PREFIX+saveId,this.createXml());


    }

    remove(saveId:string){
        localStorage.removeItem(this.SAVE_PREFIX+saveId);
    }

    loadAllSaveIds():string[]{
        const saveIds = []
        for (var key in localStorage){
            if(key.substring(0,this.SAVE_PREFIX.length)===this.SAVE_PREFIX){
                saveIds.push(key.substring(this.SAVE_PREFIX.length));
            }
        }
        return saveIds;
    }



    /*downloadXml(){
        download;
        alert(this.createXml());
        //download(this.createXml(), "WebAppGames.xml", "text/xml");
    }*/



}