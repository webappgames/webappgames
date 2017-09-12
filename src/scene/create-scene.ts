import * as BABYLON from 'babylonjs';
import createStairs from './create-stairs';


function getMaterial(name:string,scene:BABYLON.Scene){
    const material = new BABYLON.StandardMaterial("texture3", scene);
    material.diffuseTexture = new BABYLON.Texture(`/assets/testures/${name}.jpg`, scene);
    return material;
}


export default function createScene(canvas: HTMLCanvasElement, engine: BABYLON.Engine): BABYLON.Scene {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(1, 1, 1, 0);

    const camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(-10, 2, -10), scene);
    camera.fov = 1.2;

    camera.attachControl(canvas, true);
    camera.angularSensibility = 2000;
    camera.inertia = 0.7;
    camera.speed = 1;
    camera.keysUp.push(87);    //W
    camera.keysDown.push(83)   //D
    camera.keysLeft.push(65);  //A
    camera.keysRight.push(68); //S


    scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
    scene.collisionsEnabled = true;
    camera.checkCollisions = true;
    camera.applyGravity = true;
    camera.ellipsoid = new BABYLON.Vector3(2, 3, 2);


    const light1 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
    light1.position = new BABYLON.Vector3(20, 3, 20);
    light1.intensity = 0.5;

    const light2 = new BABYLON.DirectionalLight("dir02", new BABYLON.Vector3(2, -1, -1), scene);
    light2.position = new BABYLON.Vector3(20, 3, 20);
    light2.diffuse = BABYLON.Color3.FromHexString('#ffd11b');
    light2.intensity = 0.5;


    const groundMesh = BABYLON.Mesh.CreateGround("ground", 10000, 10000, 2, scene);
    groundMesh.position.y = -0.5;
    groundMesh.checkCollisions = true;

    const groundMaterial = new BABYLON.StandardMaterial("texture3", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("/assets/testures/grass.jpg", scene);
    //groundMaterial.diffuseTexture.uScale = 50;
    //groundMaterial.diffuseTexture.vScale = 50;
    //const groundMaterial = new BABYLON.StandardMaterial("ground-material", scene);
    //groundMaterial.diffuseColor = BABYLON.Color3.FromHexString('#bbffbe');
    groundMesh.material = groundMaterial;

    const stairsMesh = createStairs(scene, 50);
    stairsMesh.position.y = -0.5;



    const building = BABYLON.Mesh.CreateBox("box", 50, scene);
    building.position.y = -0.5;
    building.position.x = 75;
    building.checkCollisions = true;
    building.material = getMaterial('stone-plain',scene);



    const building2 = BABYLON.Mesh.CreateBox("box", 10, scene);
    building2.position.y = -0.5;
    building2.position.x = 50;
    building2.position.z = 60;
    building2.checkCollisions = true;
    building2.material = getMaterial('stone-plain',scene);



    camera.onCollide = function (collidedMesh: any) {
    };





    return scene;
}