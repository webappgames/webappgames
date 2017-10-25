//import log from '../../tools/log';
import * as BABYLON from 'babylonjs';
import World from '../World';

//todo maybe extend from BABYLON.AbstractMesh
export default class AbstractBrick{

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
}


