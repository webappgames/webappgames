import * as BABYLON from 'babylonjs';

export default class AbstractSpell{

    public direction = BABYLON.Vector3.Zero();

    constructor(
        public targetMesh:BABYLON.AbstractMesh,
        public targetPoint:BABYLON.Vector3,
        public playerMesh:BABYLON.AbstractMesh,
        public scene:BABYLON.Scene,
        public sharedStarage:any,
    ){
    }

    acceptTargetMesh(){
            return this.targetMesh.name!=='ground'
    }

    get dynamicTarget():BABYLON.Vector3{
        return this.targetMesh.position;
    }
    get dynamicSpeed():number{
        return 100;
    }

    execute(){
    }

    get message():string{
        return '';
    }

    //todo in future thare should be more resources than energy
    countEnergyCost():number{
        return 0;
    }
    countEnergyGain():number{
        return 0;
    }



}