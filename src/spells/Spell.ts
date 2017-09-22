import * as BABYLON from 'babylonjs';

export default class Spell{

    public direction = BABYLON.Vector3.Zero();

    constructor(
        public targetMesh:BABYLON.AbstractMesh,
        public targetPoint:BABYLON.Vector3,
        public playerMesh:BABYLON.AbstractMesh,
        public sharedStarage:{},
    ){
    }


    execute(){
    }


}