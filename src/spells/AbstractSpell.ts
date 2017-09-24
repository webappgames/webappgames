import * as BABYLON from 'babylonjs';

export default class AbstractSpell{
    /*
    TARGETS = 1
    -----------


    TARGETS > 1
    -----------

    TARGETS = 0
    -----------
    Spell that interacts with user or whole environment.

    Imediate, Durable//todo
    */
    public TARGETS = 1;




    //todo only with targets
    public direction = BABYLON.Vector3.Zero();


    acceptTargetMesh(){
            return this.targetMesh.name!=='ground'
    }

    get dynamicTarget():BABYLON.Vector3{
        return this.targetMesh.position;
    }
    get dynamicSpeed():number{
        return 100;
    }









    constructor(
        public targetMeshes:BABYLON.AbstractMesh[],
        public targetPoints:BABYLON.Vector3[],
        public playerMesh:BABYLON.AbstractMesh,
        public scene:BABYLON.Scene,
    ){
    }




    //todo in future thare should be more resources than energy
    countEnergyCost():number{
        return 0;
    }
    countEnergyGain():number{
        return 0;
    }





    begin(){
    }
    execute(){
    }





}