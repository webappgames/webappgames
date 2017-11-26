//import log from '../../tools/log';
import * as BABYLON from 'babylonjs';
//import AbstractBrick from './AbstractBrick';
import AbstractBrickFinite from './AbstractBrickFinite';

export default class Sphere extends AbstractBrickFinite{

    createBabylonMesh(){
        this.mesh = BABYLON.Mesh.CreateSphere("SphereBrick", 16,  this.size.x, this.world.scene);
    }

    get physicsImpostor():number {
        return BABYLON.PhysicsImpostor.SphereImpostor;
    }

}


