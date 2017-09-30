import * as BABYLON from 'babylonjs';

export function countVolume(mesh:BABYLON.AbstractMesh){
    //todo This is precise only for box.
    return mesh.scaling.x*mesh.scaling.y*mesh.scaling.z;
}