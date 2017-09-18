import * as BABYLON from 'babylonjs';
//import createStairs from './create-stairs';
//import injectObjectPicking from './inject-object-picking';
import setControlls from './set-controlls';
import createSpellParticles from './create-spell-particles';
import {PLAYER} from '../config';

function getMaterial(name:string,textureScale:number,scene:BABYLON.Scene){
    const material = new BABYLON.StandardMaterial("texture3", scene);
    const texture = new BABYLON.Texture(`/assets/textures/${name}.jpg`, scene);
    texture.uScale=textureScale;
    texture.vScale=textureScale;
    material.diffuseTexture = texture;
    //material.specularColor = BABYLON.Color3.FromHexString('#ff0000');
    //material.emissiveColor = BABYLON.Color3.FromHexString('#00ff00');
    return material;
}


export default function createScene(canvasElement: HTMLCanvasElement, engine: BABYLON.Engine): BABYLON.Scene {
    const scene = new BABYLON.Scene(engine);


    scene.clearColor = new BABYLON.Color4(1, 1, 1, 0);



    const camera = new BABYLON.FreeCamera("FreeCamera", BABYLON.Vector3.Zero(),  scene);
    camera.fov = 1.3;

    /*camera.attachControl(canvas, true);
    camera.angularSensibility = 2000;
    camera.inertia = 0.7;
    camera.speed = 5;
    camera.keysUp.push(87);    //W
    camera.keysDown.push(83)   //D
    camera.keysLeft.push(65);  //A
    camera.keysRight.push(68); //S*/


    //scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
    //scene.collisionsEnabled = true;
    //camera.checkCollisions = true;
    //camera.applyGravity = true;
    //camera.ellipsoid = new BABYLON.Vector3(2, 3, 2);



    const light1 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(1, -2, 1), scene);
    light1.position = new BABYLON.Vector3(20, 3, 20);
    light1.intensity = 1;








    const gravityVector = new BABYLON.Vector3(0,-100, 0);
    //const physicsPlugin = new BABYLON.CannonJSPlugin();
    const physicsPlugin = new BABYLON.OimoJSPlugin()
    scene.enablePhysics(gravityVector, physicsPlugin);
    //scene.enablePhysics();





    const playerMesh = BABYLON.Mesh.CreateBox("box", 4, scene);
    //todo isVisible playerMesh.visibility = 0;
    playerMesh.showBoundingBox = true;
    playerMesh.position =  new BABYLON.Vector3(-100, 6, -100);
    playerMesh.rotation =  new BABYLON.Vector3(0, /*Math.PI/16*/0, 0);
    //playerMesh.material = getMaterial('grass', 1, scene);
    playerMesh.physicsImpostor = new BABYLON.PhysicsImpostor(playerMesh, BABYLON.PhysicsImpostor.BoxImpostor, {
        mass: 100,
        restitution: 0.01,
        friction: 1
    }, scene);


    camera.parent = playerMesh;
    setControlls(
            canvasElement
            ,(alpha:number,beta:number)=>{

                camera.rotation.x += alpha;
                //camera.rotation.y += beta;
                //playerMesh.rotation.x += alpha;
                playerMesh.rotation.y = beta;
                //playerMesh.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0,beta*100,0));

                //const cameraDirection = camera.getDirection(new BABYLON.Vector3(1,0,1));
                //const cameraRotation = Math.atan2(cameraDirection.z,cameraDirection.x);
                //console.log(cameraRotation);
                //console.log(playerMesh.physicsImpostor.getAngularVelocity());

            }
            ,(vector:BABYLON.Vector3)=>{

                const cameraDirection = camera.getDirection(new BABYLON.Vector3(1,1,1));
                const cameraRotation = Math.atan2(cameraDirection.z,cameraDirection.x);


                const distance = Math.sqrt(Math.pow(vector.x,2)+Math.pow(vector.z,2));
                const rotation = Math.atan2(vector.z,vector.x)+cameraRotation+Math.PI/4;


                const rotatedVector = new BABYLON.Vector3(
                    Math.cos(rotation)*distance,
                    vector.y,
                    Math.sin(rotation)*distance
                );



                const currentVelocity = playerMesh.physicsImpostor.getLinearVelocity();
                const composedVelocity = currentVelocity.add(rotatedVector);
                const composedVelocityLength = composedVelocity.length();
                if(composedVelocityLength>PLAYER.SPEED.TERMINAL){
                    composedVelocity.scaleInPlace(PLAYER.SPEED.TERMINAL/composedVelocityLength);
                }
                playerMesh.physicsImpostor.setLinearVelocity(composedVelocity);



            }
        );





    const groundMesh = BABYLON.Mesh.CreateGround("ground", 1000, 1000, 2, scene);
    groundMesh.position.y = -0.5;
    //groundMesh.checkCollisions = true;
    groundMesh.material = getMaterial('grass',100,scene);
    groundMesh.physicsImpostor = new BABYLON.PhysicsImpostor(groundMesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.1}, scene);





    /*const stairsMesh = createStairs(scene, 50);
    stairsMesh.position.y = -0.5;



    const building = BABYLON.Mesh.CreateBox("box", 50, scene);
    building.position.y = -0.5;
    building.position.x = 75;
    building.checkCollisions = true;
    building.material = getMaterial('stone-plain',scene);*/



    /*for(let i=0;i<100;i++){
        const boxMesh = BABYLON.Mesh.CreateBox("box", 4, scene);
        boxMesh.position.y = Math.random()*20;
        boxMesh.position.x = (Math.random()-0.5)*100;
        boxMesh.position.z = (Math.random()-0.5)*100;
        boxMesh.rotation.y = Math.random()*Math.PI*2;

        boxMesh.rotation.x = Math.random()*Math.PI*2/20;
        boxMesh.rotation.z = Math.random()*Math.PI*2/20;
        boxMesh.checkCollisions = true;
        boxMesh.material = getMaterial('stone-plain',scene);


        boxMesh.physicsImpostor = new BABYLON.PhysicsImpostor(boxMesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
    }*/

    for(let y=0;y<3;y++) {
        for (let x = 0; x < 3; x++) {
            for (let i = 0; i < 50; i++) {
                const boxMesh = BABYLON.Mesh.CreateBox("box", 4, scene);
                boxMesh.position.y = i * 4 + 1;
                boxMesh.position.x = (x-5) * 4;
                boxMesh.position.z = (y-5) * 4;
                //boxMesh.checkCollisions = true;
                boxMesh.material = getMaterial('stone-plain', 1, scene);


                boxMesh.physicsImpostor = new BABYLON.PhysicsImpostor(boxMesh, BABYLON.PhysicsImpostor.BoxImpostor, {
                    mass: 10,
                    restitution: 0.2
                }, scene);


                /*boxMesh.physicsImpostor.registerOnPhysicsCollide(groundMesh.physicsImpostor, function(main, collided) {
                    console.log('boom');
                    //main.sleep();
                });*/



            }
        }
    }

    //injectObjectPicking(scene,canvasElement,groundMesh);

    camera.onCollide = function (collidedMesh: any) {
    };







    function onPointerDown() {


        var pickInfo = scene.pick(canvasElement.width / 2, canvasElement.height / 2, (mesh)=>{
            return mesh !== playerMesh && mesh !== groundMesh && 'physicsImpostor' in mesh;
        });



        if (pickInfo.hit) {


            //todo not from camera but from two points
            const cameraDirection = camera.getDirection(new BABYLON.Vector3(1, 1, 1));
            pickInfo.pickedMesh.physicsImpostor.setLinearVelocity(cameraDirection.scale(100));


            const fountainMesh = BABYLON.Mesh.CreateBox("fountain", 1, scene);
            fountainMesh.isVisible = false;
            fountainMesh.position = playerMesh.position.clone();
            createSpellParticles(fountainMesh,scene);

            scene.registerBeforeRender(()=> {

                fountainMesh.position.x += 0.05;

            })



        }


    }
    canvasElement.addEventListener("pointerdown", onPointerDown, false);






    return scene;
}

