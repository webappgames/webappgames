import * as BABYLON from 'babylonjs';
import * as download from 'downloadjs';
import * as xmlBuilder from 'xmlbuilder';
import DataModel from '../data-model';

function vectorToString(vector:BABYLON.Vector3):string{
    const values:string[] = [];
    for(const axis of ['x','y','z']){
        values.push((Math.round(vector[axis]*1000)/100).toString());
    }
    return values.join(',');
}

export default class WorldGenerator{
    constructor(
        private scene:BABYLON.Scene,
        private dataModel:DataModel
    ){}


    createXml(pretty=true){

            this.scene;
            this.dataModel;


            const world = xmlBuilder.create('world');
            world.attribute('version', '0.1');
            const head = world.element('head');head;
            head.element('meta')
                .attribute('name', 'creator')
                .attribute('content', window.location.hostname);


            //todo player
            const playerMesh = this.scene.meshes.find((mesh)=>mesh.name==='player');
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



    downloadXml(){
        download;
        alert(this.createXml());
        //download(this.createXml(), "WebAppGames.xml", "text/xml");
    }



}