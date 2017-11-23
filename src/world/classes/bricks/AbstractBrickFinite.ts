import * as BABYLON from 'babylonjs';
import World from '../World';
import AbstractBrick from './AbstractBrick';
import Structure from '../Structure';

export default class AbstractBrickFinite extends AbstractBrick{
    public mesh:BABYLON.AbstractMesh;

    constructor(
        world:World,
        originalMaterialName:string,
        size:BABYLON.Vector3,
        private _position:BABYLON.Vector3,
        private _rotation:BABYLON.Vector3 = BABYLON.Vector3.Zero(),
        private _linearVelocity:BABYLON.Vector3 = BABYLON.Vector3.Zero(),
        private _angularVelocity:BABYLON.Vector3 = BABYLON.Vector3.Zero(),

    ){
        super(
            world,
            originalMaterialName,
            size
        );
        this.mesh.position = this._position;
        this.mesh.rotation = this._rotation;
    }

    applyStructure(structure:Structure){
            super.applyStructure(structure);
            this.mesh.physicsImpostor.setLinearVelocity(this._linearVelocity);
            this.mesh.physicsImpostor.setAngularVelocity(this._angularVelocity);
    }

    get position():BABYLON.Vector3{
        return this._position;
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

    set linearVelocity(linearVelocity:BABYLON.Vector3){
        this.mesh.physicsImpostor.setLinearVelocity(linearVelocity);
    }

    set angularVelocity(angularVelocity:BABYLON.Vector3){
        this.mesh.physicsImpostor.setAngularVelocity(angularVelocity);
    }

    get volume():number{
        //todo This is precise only for box.
        return this.size.x*this.size.y*this.size.z;
    }


    get energyPotential():number{
        //todo gravity field constant
        return this.volume * this.mesh.position.y;
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
}


