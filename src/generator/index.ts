import * as BABYLON from 'babylonjs';
import log from '../tools/log';
import MaterialFactory from '../scene/classes/MaterialFactory';
import Player from '../scene/classes/Player';
import DataModel from '../data-model';
import * as _ from 'lodash';


export default class WorldGenerator{
    constructor(
        private player:Player,
        private materialFactory:MaterialFactory,
        private dataModel:DataModel,
        private scene:BABYLON.Scene
    ){}


    createMesh0(mesh1:BABYLON.AbstractMesh, scale=1){

        const mesh0 = BABYLON.Mesh.CreateBox("box0", 1, this.scene);
        mesh0.scaling = mesh1.scaling.clone();
        mesh0.scaling.x *= scale;
        mesh0.scaling.y = 1000;
        mesh0.scaling.z *= scale;
        mesh0.position = mesh1.position.subtract(new BABYLON.Vector3(0,mesh1.scaling.y/2+mesh0.scaling.y/2,0));
        mesh0.material = this.materialFactory.getMaterial('clay-bricks');


        mesh0.physicsImpostor = new BABYLON.PhysicsImpostor(mesh0, BABYLON.PhysicsImpostor.BoxImpostor, {
            mass: 0
        }, this.scene);


    }


    generateWorld(){

        //this.playerMesh.position = new BABYLON.Vector3(-10,2,100);
        //this.createMesh0(this.playerMesh,10);
        this.player.mesh.position.x += 5;
        this.player.mesh.position.z += -10;


        //----------------------------------Billboard
        const width = 1280/100;
        const height = 750/100;
        const pillarSize = new BABYLON.Vector3(1,5,1);
        const center = new BABYLON.Vector3(0,0,10);

        const pillar1 = BABYLON.Mesh.CreateBox("box", 1, this.scene);
        //const pillar1 = BABYLON.Mesh.CreateCylinder("cylinder", 3, 3, 3, 20, 1, this.scene);
        pillar1.scaling = pillarSize;
        pillar1.position = center.add(new BABYLON.Vector3(0, pillarSize.y/2, 0));
        this.materialFactory.applyMaterial(pillar1);



        const billboardMesh = BABYLON.Mesh.CreateBox("box", 1, this.scene);
        billboardMesh.scaling = new BABYLON.Vector3(width,height, 1);
        billboardMesh.position = center.add(new BABYLON.Vector3(0, billboardMesh.scaling.y/2+pillarSize.y, 0));
        this.materialFactory.applyMaterial(billboardMesh,"itnetwork_summer_2017");

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
        this.dataModel.linkAreas.push(billboardLinkArea);

        const updater = _.throttle(()=>{

            if(billboardMesh.isDisposed()){
                //this.dataModel.linkAreas = this.dataModel.linkAreas.filter((linkArea)=>linkArea!==billboardLinkArea);
                this.dataModel.linkAreas[0].position.x = -10;
                this.dataModel.linkAreas[0].position.y = -10;
                this.dataModel.linkAreas[0].size.x = 10;
                this.dataModel.linkAreas[0].size.y = 10;
                    this.scene.unregisterAfterRender(updater);
                log.send(`Stop updating link area "${billboardLinkArea.url}".`,billboardLinkArea,billboardMesh,this.dataModel.linkAreas);
                return;
            }

            const canvas = this.scene.getEngine().getRenderingCanvas() as HTMLCanvasElement;
            const corners = [
                billboardMesh.position.add(billboardMesh.scaling.scale(0.5)),
                billboardMesh.position.add(billboardMesh.scaling.scale(-.5))
            ].map((corner)=>BABYLON.Vector3.Project(
                corner,
                BABYLON.Matrix.Identity(),
                this.scene.getTransformMatrix(),
                this.scene.activeCamera.viewport.toGlobal(canvas.clientWidth, canvas.clientHeight)
            ));
            for(let axis of ['x','y']){
                this.dataModel.linkAreas[0].position[axis] = (corners[0][axis] + corners[1][axis]) / 2;
                this.dataModel.linkAreas[0].size[axis] = Math.abs(corners[0][axis] - corners[1][axis]);
            };


        },1000);


        this.scene.registerAfterRender(updater);
        //----------------------------------






        //----------------------------------Building
        const towers = 1;
        const floors = 6;
        const size = new BABYLON.Vector3(50,10,50);
        const pillsInFloor = 5;
        const pillsThick = 0.2;


        for (let tower = 0; tower < towers; tower++) {

            const rotation = tower/towers*Math.PI*2;

            const center = new BABYLON.Vector3(
                Math.sin(rotation)*100,
                -10,
                Math.cos(rotation)*100
            );


            for (let floor = 1; floor < floors; floor++) {


                const mesh1 = BABYLON.Mesh.CreateBox("box", 1, this.scene);
                mesh1.scaling = new BABYLON.Vector3(size.x, 1, size.z);
                mesh1.position = center.add(new BABYLON.Vector3(0, floor * 10 + 9.5, 0));
                this.materialFactory.applyMaterial(mesh1);


                for (let pillX = 0; pillX < pillsInFloor; pillX++) {
                    for (let pillY = 0; pillY < pillsInFloor; pillY++) {


                        if(floor===2 && pillX===0 && pillY===2){
                        }else {

                            const mesh1 = BABYLON.Mesh.CreateBox("box", 1, this.scene);
                            mesh1.scaling = new BABYLON.Vector3(
                                size.x / pillsInFloor * pillsThick,
                                9,
                                size.z / pillsInFloor * pillsThick
                            );
                            mesh1.position = center.add(new BABYLON.Vector3(
                                (pillX / (pillsInFloor - 1) - .5) * size.x * (1 - 1 / pillsInFloor * pillsThick),
                                floor * 10 + 4.5,
                                (pillY / (pillsInFloor - 1) - .5) * size.z * (1 - 1 / pillsInFloor * pillsThick)
                            ));
                            this.materialFactory.applyMaterial(mesh1);
                        }

                    }
                }
                /*if (floor === 0) {
                    //this.createMesh0(mesh1, 2);
                }else {

                }*/




            }
        }
        //----------------------------------




        //----------------------------------Domino
        for (let i = 0; i < 7; i++) {

            /*const faceUV = new Array(6);
            for (let i = 0; i < 6; i++) {
                faceUV[i] = new BABYLON.Vector4(0, 0, 100, 1);
            }*/
            const width = 2;
            const height = 40;
            const depth = 100;
            const faceUV = [
                new BABYLON.Vector4(0, 0, width/10 , height/10),
                new BABYLON.Vector4(0, 0, width/10 , height/10),

                new BABYLON.Vector4(0, 0, height/10 , depth/10),
                new BABYLON.Vector4(0, 0, height/10 , depth/10),

                new BABYLON.Vector4(0, 0, depth/10 , width/10),
                new BABYLON.Vector4(0, 0, depth/10 , width/10),
            ];
            const meshOptions = {width, height, depth, faceUV};
            const mesh1 = BABYLON.MeshBuilder.CreateBox('box', meshOptions, this.scene);
            //mesh1.scaling = new BABYLON.Vector3(2, 40, 10);
            mesh1.position = new BABYLON.Vector3(i*25+50, 15, 100);
            this.materialFactory.applyMaterial(mesh1);

        }
        //----------------------------------




        //----------------------------------Domino Jenga
        /*{
            const center = new BABYLON.Vector3(-40, 0, 100);
            const blockSize = new BABYLON.Vector3(2.5,1.5,7.5);

            for (let floor = 0; floor < 20; floor++) {
                for (let i = -1; i <= 1; i++) {
                    const mesh1 = BABYLON.Mesh.CreateBox("box", 1, this.scene);
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
                    this.materialFactory.applyMaterial(mesh1, 'wood-fence');
                }
            }
        }*/
        //----------------------------------



        /*setInterval(()=>{


            const boxMesh = BABYLON.Mesh.CreateSphere("box", 16,1, this.scene);
            boxMesh.scaling = new BABYLON.Vector3(3,3,3);
            boxMesh.position = new BABYLON.Vector3(0, 100 , 0);
            boxMesh.material = this.materialFactory.getSound('stone-plain');


            boxMesh.physicsImpostor = new BABYLON.PhysicsImpostor(boxMesh, BABYLON.PhysicsImpostor.SphereImpostor, {
                mass: 1000,
                restitution: 0.2
            }, this.scene);
            boxMesh.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,-5,100));



        },4000);*/



    }




}