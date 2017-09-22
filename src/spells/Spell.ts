import * as BABYLON from 'babylonjs';

export default class Spell{

    constructor(
        public targetMesh:BABYLON.AbstractMesh,
        public playerMesh:BABYLON.AbstractMesh,
    ){
    }


    execute(){
    }


}