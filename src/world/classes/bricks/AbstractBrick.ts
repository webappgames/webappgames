//import log from '../../tools/log';
import * as BABYLON from 'babylonjs';
import World from '../World';

//todo maybe extend from BABYLON.AbstractMesh
export default class{

    public mesh:BABYLON.AbstractMesh;

    constructor(
        public world:World,
        public materialName:string,
        public size:BABYLON.Vector3,
        public position:BABYLON.Vector3,
        private _rotation:BABYLON.Vector3 = BABYLON.Vector3.Zero(),
        private _linearVelocity:BABYLON.Vector3 = BABYLON.Vector3.Zero(),
        private _angularVelocity:BABYLON.Vector3 = BABYLON.Vector3.Zero(),

    ){
        this.createBabylonMesh();
        this._ApplyExternalsOnMesh();
        this.world.bricks.push(this);
    }

    get rotation():BABYLON.Vector3{
        return this.mesh.rotationQuaternion.toEulerAngles();
    }

    get linearVelocity():BABYLON.Vector3{
        return this.mesh.physicsImpostor.getLinearVelocity();
    }

    get angularVelocity():BABYLON.Vector3{
        return this.mesh.physicsImpostor.getAngularVelocity();
    }

    public createBabylonMesh() {
        throw new Error('This method should be overwritten.');
    }

    private _ApplyExternalsOnMesh(){
        this.mesh.position = this.position;
        this.mesh.rotation = this._rotation;
        this.world.materialFactory.applyMaterial(this.mesh,this.materialName);
        this.mesh.physicsImpostor.setLinearVelocity(this._linearVelocity);
        this.mesh.physicsImpostor.setAngularVelocity(this._angularVelocity);
    }

    get volume():number{
        //todo This is precise only for box.
        return this.size.x*this.size.y*this.size.z;
    }

    get energy():number{
        return this.energyPotential + this.energyKinetics;
    }

    get energyPotential():number{
        //todo gravity field constant
        return this.volume * this.mesh.position.y;
    }

    get energyKinetics():number{
        return this.energyKineticsLinear + this.energyKineticsAngular;
    }

    get energyKineticsLinear():number{
        //todo constants
        return this.mesh.physicsImpostor.getLinearVelocity().length() * this.volume;
    }

    get energyKineticsAngular():number{
        //todo constants
        //todo spinning constant for every shape
        return this.mesh.physicsImpostor.getAngularVelocity().length() * this.volume;
    }

    dispose(){
        this.world.bricks = this.world.bricks.filter((mesh)=>mesh!==this);
        this.mesh.dispose();

    }

}


