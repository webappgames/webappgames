import * as BABYLON from 'babylonjs';
import createStairs from './create-stairs';
import injectObjectPicking from './inject-object-picking';


function getMaterial(name:string,scene:BABYLON.Scene){
    const material = new BABYLON.StandardMaterial("texture3", scene);
    const texture = new BABYLON.Texture(`/assets/testures/${name}.jpg`, scene);
    texture.uScale=10;
    texture.vScale=10;
    material.diffuseTexture = texture;
    material.specularColor = BABYLON.Color3.FromHexString('#ff0000');
    material.emissiveColor = BABYLON.Color3.FromHexString('#00ff00');
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
    camera.speed = 5;
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
    light1.intensity = 1;







    const groundMesh = BABYLON.Mesh.CreateGround("ground", 1000, 1000, 2, scene);
    groundMesh.position.y = -0.5;
    groundMesh.checkCollisions = true;
    groundMesh.material = getMaterial('grass',scene);

    const stairsMesh = createStairs(scene, 50);
    stairsMesh.position.y = -0.5;



    const building = BABYLON.Mesh.CreateBox("box", 50, scene);
    building.position.y = -0.5;
    building.position.x = 75;
    building.checkCollisions = true;
    building.material = getMaterial('stone-plain',scene);



    for(let i=0;i<100;i++){
        const box = BABYLON.Mesh.CreateBox("box", 4, scene);
        box.position.y = 0;
        box.position.x = (Math.random()-0.5)*100;
        box.position.z = (Math.random()-0.5)*100;
        box.rotation.y = Math.random()*Math.PI*2;

        box.rotation.x = Math.random()*Math.PI*2/20;
        box.rotation.z = Math.random()*Math.PI*2/20;
        box.checkCollisions = true;
        box.material = getMaterial('stone-plain',scene);
    }


    injectObjectPicking(scene,groundMesh);


    camera.onCollide = function (collidedMesh: any) {
    };



    scene.registerBeforeRender(()=>{
        camera.cameraDirection.y += 0.01;
    });


    return scene;
}