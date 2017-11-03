//import log from '../../tools/log';
import * as BABYLON from 'babylonjs';
import World from '../World';

//todo maybe extend from BABYLON.AbstractMesh
export default class AbstractBrick{

    public mesh:BABYLON.AbstractMesh;

    constructor(
        public world:World,
        private _originalMaterialName:string,
        private _size:BABYLON.Vector3 = BABYLON.Vector3.Zero()

    ){
        this.createBabylonMesh();
        this.materialName = this._originalMaterialName;
        this.world.bricks.push(this);
    }

    get size():BABYLON.Vector3{
        return this._size;
    }

    get position():BABYLON.Vector3{
        return BABYLON.Vector3.Zero();
    }

    get rotation():BABYLON.Vector3{
        return BABYLON.Vector3.Zero();
    }

    get linearVelocity():BABYLON.Vector3{
        return BABYLON.Vector3.Zero();
    }

    get angularVelocity():BABYLON.Vector3{
        return BABYLON.Vector3.Zero();
    }

    set linearVelocity(linearVelocity:BABYLON.Vector3){
        throw new Error('Cannot set linearVelocity of AbstractBrick.');
    }

    set angularVelocity(angularVelocity:BABYLON.Vector3){
        throw new Error('Cannot set angularVelocity of AbstractBrick.');
    }


    public createBabylonMesh() {
        throw new Error('This method should be overwritten.');
    }

    dispose(){
        this.world.bricks = this.world.bricks.filter((mesh)=>mesh!==this);
        //todo delete spells targeting to this Brick.
        this.mesh.dispose();

    }

    replaceBy(brick:AbstractBrick){
        //todo replace spells targeting to this Brick.
        this.dispose();

    }

    clone():AbstractBrick{
        throw new Error('This method should be overwritten.');
    }

    set materialName(materialName:string){
        this.world.materialFactory.applyMaterial(this.mesh,materialName);
    }

    get volume():number{
        return NaN;
    }

    get energy():number{
        return this.energyPotential + this.energyKinetics;
    }

    get energyPotential():number{
        return NaN;
    }

    get energyKinetics():number{
        return this.energyKineticsLinear + this.energyKineticsAngular;
    }

    get energyKineticsLinear():number{
        return NaN;
    }

    get energyKineticsAngular():number{
        return NaN;
    }


}


