import * as BABYLON from 'babylonjs';

export default class Spell{

    public static title = 'Spell';
    public static cathegory = 'Spell';

    constructor(
        public target:BABYLON.AbstractMesh
    ){
    }


    execute(){
    }


}