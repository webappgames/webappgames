import * as BABYLON from 'babylonjs';

//todo deprecated
export function countVolume(mesh:BABYLON.AbstractMesh){
    //todo This is precise only for box.
    return mesh.scaling.x*mesh.scaling.y*mesh.scaling.z;
}

//todo depracated
export function countEnergy(mesh:BABYLON.AbstractMesh){

    const volume = countVolume(mesh);
    const linearVelocityEnergy = volume * mesh.physicsImpostor.getLinearVelocity().length();
    const potentialEnergy = volume * mesh.position.y;//todo gravity field constant

    return(linearVelocityEnergy+potentialEnergy);
}