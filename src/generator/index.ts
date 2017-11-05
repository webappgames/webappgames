import * as BABYLON from 'babylonjs';
//import log from '../tools/log';
import World from '../world/classes/World';
//import MaterialFactory from '../world/classes/MaterialFactory';
//import Player from '../world/classes/Player';
import Box from '../world/classes/bricks/Box';
import Maze from './Maze';
import Building from './Building';
//import UIDataModel from '../data-model';
import * as _ from 'lodash';


export default class WorldGenerator{
    constructor(
        private world:World
        //private player:Player,
        //private materialFactory:MaterialFactory,
        //private uiDataModel:UIDataModel,
        //private scene:BABYLON.Scene
    ){}


    createMesh0(mesh1:BABYLON.AbstractMesh, scale=1){

        const mesh0 = BABYLON.Mesh.CreateBox("box0", 1, this.world.scene);
        mesh0.scaling = mesh1.scaling.clone();
        mesh0.scaling.x *= scale;
        mesh0.scaling.y = 1000;
        mesh0.scaling.z *= scale;
        mesh0.position = mesh1.position.subtract(new BABYLON.Vector3(0,mesh1.scaling.y/2+mesh0.scaling.y/2,0));
        mesh0.material = this.world.materialFactory.getMaterial('clay-bricks');


        mesh0.physicsImpostor = new BABYLON.PhysicsImpostor(mesh0, BABYLON.PhysicsImpostor.BoxImpostor, {
            mass: 0
        }, this.world.scene);


    }


    generateWorld(){

        //this.world.player.mesh.position.x += 5;
        //this.world.player.mesh.position.z += -10;


        //----------------------------------Billboard
        _;
        /*!todo const width = 1280/100;
        const height = 750/100;
        const pillarSize = new BABYLON.Vector3(1,5,1);
        const center = new BABYLON.Vector3(0,0,10);

        const pillar1 = BABYLON.Mesh.CreateBox("box", 1, this.world.scene);
        //const pillar1 = BABYLON.Mesh.CreateCylinder("cylinder", 3, 3, 3, 20, 1, this.world.scene);
        pillar1.scaling = pillarSize;
        pillar1.position = center.add(new BABYLON.Vector3(0, pillarSize.y/2, 0));
        this.world.materialFactory.applyMaterial(pillar1);



        const billboardMesh = BABYLON.Mesh.CreateBox("box", 1, this.world.scene);
        billboardMesh.scaling = new BABYLON.Vector3(width,height, 1);
        billboardMesh.position = center.add(new BABYLON.Vector3(0, billboardMesh.scaling.y/2+pillarSize.y, 0));
        this.world.materialFactory.applyMaterial(billboardMesh,"itnetwork_summer_2017");

        const billboardLinkArea = {
            position:{
                x:-10,y:-10
            },
            size:{
                x:10,y:10
            },
            title: '',
            url: 'https://www.itnetwork.cz/letni-programatorska-soutez-2017',
        };
        this.world.uiDataModel.linkAreas.push(billboardLinkArea);

        const updater = _.throttle(()=>{

            if(billboardMesh.isDisposed()){
                //this.world.uiDataModel.linkAreas = this.world.uiDataModel.linkAreas.filter((linkArea)=>linkArea!==billboardLinkArea);
                this.world.uiDataModel.linkAreas[0].position.x = -10;
                this.world.uiDataModel.linkAreas[0].position.y = -10;
                this.world.uiDataModel.linkAreas[0].size.x = 10;
                this.world.uiDataModel.linkAreas[0].size.y = 10;
                    this.world.scene.unregisterAfterRender(updater);
                log.send(`Stop updating link area "${billboardLinkArea.url}".`,billboardLinkArea,billboardMesh,this.world.uiDataModel.linkAreas);
                return;
            }

            const canvas = this.world.scene.getEngine().getRenderingCanvas() as HTMLCanvasElement;
            const corners = [
                billboardMesh.position.add(billboardMesh.scaling.scale(0.5)),
                billboardMesh.position.add(billboardMesh.scaling.scale(-.5))
            ].map((corner)=>BABYLON.Vector3.Project(
                corner,
                BABYLON.Matrix.Identity(),
                this.world.scene.getTransformMatrix(),
                this.world.scene.activeCamera.viewport.toGlobal(canvas.clientWidth, canvas.clientHeight)
            ));
            for(let axis of ['x','y']){
                this.world.uiDataModel.linkAreas[0].position[axis] = (corners[0][axis] + corners[1][axis]) / 2;
                this.world.uiDataModel.linkAreas[0].size[axis] = Math.abs(corners[0][axis] - corners[1][axis]);
            };


        },1000);


        this.world.scene.registerAfterRender(updater);*/
        //----------------------------------






        //----------------------------------Building
        //const towers = 1;
        const floors = 8;
        const size = new BABYLON.Vector3(30,15,30);
        const pillsInFloor = 3;
        const pillsThick = 0.3;


        //for (let tower = 0; tower < towers; tower++) {
        /*const rotation = tower/towers*Math.PI*2;
        const center = new BABYLON.Vector3(
            Math.sin(rotation)*100,
            -10,
            Math.cos(rotation)*100
        );*/
        const center = new BABYLON.Vector3(
            0,
            -10,
            70
        );

        for (let floor = 1; floor < floors; floor++) {


            new Box(
                this.world,
                'stone-plain',
                new BABYLON.Vector3(size.x, 1, size.z),
                center.add(new BABYLON.Vector3(0, floor * 10 + 9.5, 0))
            );


            for (let pillX = 0; pillX < pillsInFloor; pillX++) {
                for (let pillY = 0; pillY < pillsInFloor; pillY++) {


                    if (floor === 2 && pillX === 0 && pillY === 2) {
                    } else {

                        new Box(
                            this.world,
                            'stone-plain',
                            new BABYLON.Vector3(
                                size.x / pillsInFloor * pillsThick,
                                9,
                                size.z / pillsInFloor * pillsThick
                            ),
                            center.add(new BABYLON.Vector3(
                                (pillX / (pillsInFloor - 1) - .5) * size.x * (1 - 1 / pillsInFloor * pillsThick),
                                floor * 10 + 4.5,
                                (pillY / (pillsInFloor - 1) - .5) * size.z * (1 - 1 / pillsInFloor * pillsThick)
                            ))
                        );
                    }

                }
            }


        }
        //}
        //----------------------------------




        //----------------------------------Domino
        /*for (let i = 0; i < 7; i++) {

            new BoxBrick(
                this.world,
                'stone-plain',
                new BABYLON.Vector3(2,40,10),
                new BABYLON.Vector3(i*25+50, 15, 100)
            );
        }*/
        //----------------------------------




        //----------------------------------Domino Jenga
        /*{
            const center = new BABYLON.Vector3(-40, 0, 100);
            const blockSize = new BABYLON.Vector3(2.5,1.5,7.5);

            for (let floor = 0; floor < 20; floor++) {
                for (let i = -1; i <= 1; i++) {
                    const mesh1 = BABYLON.Mesh.CreateBox("box", 1, this.world.scene);
                    mesh1.scaling = blockSize;

                    if(floor%2) {
                        mesh1.rotation.y = Math.PI / 2;
                        mesh1.position = new BABYLON.Vector3(
                            0,
                            blockSize.y * (floor + .5),
                            blockSize.x * i
                        ).add(center);
                    }else{
                        mesh1.position = new BABYLON.Vector3(
                            blockSize.x * i,
                            blockSize.y * (floor + .5),
                            0
                        ).add(center);
                    }
                    this.world.materialFactory.applyMaterial(mesh1, 'wood-fence');
                }
            }
        }*/
        //----------------------------------


        //----------------------------------
        const building = new Building(
            new Maze({x:8,y:8}),
            BABYLON.Vector3.Zero(),
            {
                sizes: {
                    cells: {
                        width: 15,
                        height: 9
                    },
                    walls: {
                        width: 1.5,
                        height: 9
                    }
                }
            },
            this.world
        );
        console.log(building.toString());
        //----------------------------------


        /*setInterval(()=>{


            const boxMesh = BABYLON.Mesh.CreateSphere("box", 16,1, this.world.scene);
            boxMesh.scaling = new BABYLON.Vector3(3,3,3);
            boxMesh.position = new BABYLON.Vector3(0, 100 , 0);
            boxMesh.material = this.world.materialFactory.getSound('stone-plain');


            boxMesh.physicsImpostor = new BABYLON.PhysicsImpostor(boxMesh, BABYLON.PhysicsImpostor.SphereImpostor, {
                mass: 1000,
                restitution: 0.2
            }, this.world.scene);
            boxMesh.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,-5,100));



        },4000);*/



    }




}