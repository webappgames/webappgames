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

    const camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(-50, 6, -70), scene);
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


    const gravityVector = new BABYLON.Vector3(0,-9.81, 0);
    //const physicsPlugin = new BABYLON.CannonJSPlugin();
    const physicsPlugin = new BABYLON.OimoJSPlugin()
    scene.enablePhysics(gravityVector, physicsPlugin);
    //scene.enablePhysics();




    const light1 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
    light1.position = new BABYLON.Vector3(20, 3, 20);
    light1.intensity = 1;







    const groundMesh = BABYLON.Mesh.CreateGround("ground", 1000, 1000, 2, scene);
    groundMesh.position.y = -0.5;
    groundMesh.checkCollisions = true;
    groundMesh.material = getMaterial('grass',scene);
    groundMesh.physicsImpostor = new BABYLON.PhysicsImpostor(groundMesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.1 }, scene);





    const stairsMesh = createStairs(scene, 50);
    stairsMesh.position.y = -0.5;



    const building = BABYLON.Mesh.CreateBox("box", 50, scene);
    building.position.y = -0.5;
    building.position.x = 75;
    building.checkCollisions = true;
    building.material = getMaterial('stone-plain',scene);



    for(let i=0;i<100;i++){
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
    }


    injectObjectPicking(scene,canvas,groundMesh);


    camera.onCollide = function (collidedMesh: any) {
    };



    //scene.registerBeforeRender(()=>{camera.cameraDirection.y += 0.01;});



    return scene;
}




/*

export default function createScene(canvas: HTMLCanvasElement, engine: BABYLON.Engine): BABYLON.Scene {

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 50, -100), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    scene.enablePhysics(new BABYLON.Vector3(0,-20, 0), new BABYLON.OimoJSPlugin());


    for(let i=0;i<100;i++){
        var box = BABYLON.Mesh.CreateBox("sphere1", 2, scene);
        box.position.y =Math.random()*100;
        box.position.x = (Math.random()-0.5)*20;
        box.position.z = (Math.random()-0.5)*20;

        box.rotation.x = Math.random()*Math.PI*2;
        box.rotation.y = Math.random()*Math.PI*2;
        box.rotation.z = Math.random()*Math.PI*2;

        box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 10, restitution: 0.5 }, scene);
    }


    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    var ground = BABYLON.Mesh.CreateGround("ground1", 1000, 1000, 2, scene);




    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

    return scene;

};/**/