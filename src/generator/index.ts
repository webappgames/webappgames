import * as BABYLON from 'babylonjs';
import MaterialFactory from '../scene/classes/MaterialFactory';


export default class WorldGenerator{
    constructor(
        private playerMesh:BABYLON.AbstractMesh,
        private materialFactory:MaterialFactory,
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
        this.playerMesh.position.x += 5;
        this.playerMesh.position.z += -10;


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



        const billboard = BABYLON.Mesh.CreateBox("box", 1, this.scene);
        billboard.scaling = new BABYLON.Vector3(width,height, 1);
        billboard.position = center.add(new BABYLON.Vector3(0, billboard.scaling.y/2+pillarSize.y, 0));
        this.materialFactory.applyMaterial(billboard,"itnetwork_summer_2017");
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


            for (let floor = 0; floor < floors; floor++) {


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


            const mesh1 = BABYLON.Mesh.CreateBox("box", 1, this.scene);
            mesh1.scaling = new BABYLON.Vector3(2, 40, 10);
            mesh1.position = new BABYLON.Vector3(i*25+50, 15, 100);
            this.materialFactory.applyMaterial(mesh1);


        }
        //----------------------------------




        /*setInterval(()=>{


            const boxMesh = BABYLON.Mesh.CreateSphere("box", 16,1, this.scene);
            boxMesh.scaling = new BABYLON.Vector3(3,3,3);
            boxMesh.position = new BABYLON.Vector3(0, 100 , 0);
            boxMesh.material = this.materialFactory.getMaterial('stone-plain');


            boxMesh.physicsImpostor = new BABYLON.PhysicsImpostor(boxMesh, BABYLON.PhysicsImpostor.SphereImpostor, {
                mass: 1000,
                restitution: 0.2
            }, this.scene);
            boxMesh.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,-5,100));



        },4000);*/



    }




}