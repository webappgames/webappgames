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

        this.playerMesh;
        //this.createMesh0(this.playerMesh,10);


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
                /*if (floor === 0) {
                    //this.createMesh0(mesh1, 2);
                }else {

                }*/




            }
        }






        /*for (let i = 0; i < 15; i++) {


            const mesh1 = BABYLON.Mesh.CreateBox("box", 1, this.scene);
            mesh1.scaling = new BABYLON.Vector3(20, 800, 8);
            mesh1.position = new BABYLON.Vector3(0, -400, i*40);
            mesh1.material = this.materialFactory.getMaterial('stone-plain');


            mesh1.physicsImpostor = new BABYLON.PhysicsImpostor(mesh1, BABYLON.PhysicsImpostor.BoxImpostor, {
                mass: 10,
                restitution: 0.2
            }, this.scene);


            this.createMesh0(mesh1,1.1);


        }*/




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