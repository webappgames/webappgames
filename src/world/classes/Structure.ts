import * as BABYLON from 'babylonjs';

//todo
//move assets to assets/structures

export default interface Structure {
    id: string;
    babylonMaterial: BABYLON.StandardMaterial;
    physicsOptions: {
        mass: number,
        restitution: number,
        friction: number
    }
}