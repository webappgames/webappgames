import * as BABYLON from 'babylonjs';
import SoundFactory from './../SoundFactory';
import * as _ from "lodash";

export default function createPlayerMesh(
    scene:BABYLON.Scene,
    camera:BABYLON.FreeCamera,
    soundFactory:SoundFactory
):BABYLON.AbstractMesh{
    const playerMesh = BABYLON.Mesh.CreateSphere("player", 16,1, scene);
    playerMesh.isVisible = false;
    playerMesh.position =  new BABYLON.Vector3(0, 2, 0);
    playerMesh.rotation =  new BABYLON.Vector3(0, 0, 0);
    playerMesh.scaling =  new BABYLON.Vector3(1, 4, 1);
    playerMesh.physicsImpostor = new BABYLON.PhysicsImpostor(playerMesh, BABYLON.PhysicsImpostor.SphereImpostor, {
        mass: 1,
        restitution: 0.01,
        friction: 100
    }, scene);

    const stepSound = soundFactory.getSound('step-ground');
    stepSound.setVolume(2);//todo to global sound config
    const playStepSound = _.throttle(()=>stepSound.play(),400, {leading:true,trailing:false});

    //todo Is thare better solution for angular friction?
    playerMesh.physicsImpostor.registerAfterPhysicsStep(()=>{
        camera.position =  playerMesh.position;
        playerMesh.physicsImpostor.setAngularVelocity(BABYLON.Vector3.Zero());
    });
    return playerMesh;
}