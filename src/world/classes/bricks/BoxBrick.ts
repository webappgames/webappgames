//import log from '../../tools/log';
import * as BABYLON from 'babylonjs';
import AbstractBrick from './AbstractBrick';

export default class BoxBrick extends AbstractBrick{

    createBabylonMesh(){
        const globalScale = 10;//todo from matrial
        const width = this.size.x;
        const height = this.size.y;
        const depth = this.size.z;
        const faceUV = [
            new BABYLON.Vector4(0, 0, width / globalScale, height / globalScale),
            new BABYLON.Vector4(0, 0, width / globalScale, height / globalScale),

            new BABYLON.Vector4(0, 0, height / globalScale, depth / globalScale),
            new BABYLON.Vector4(0, 0, height / globalScale, depth / globalScale),

            new BABYLON.Vector4(0, 0, depth / globalScale, width / globalScale),
            new BABYLON.Vector4(0, 0, depth / globalScale, width / globalScale),
        ];
        const meshOptions = {width, height, depth, faceUV};
        this.mesh = BABYLON.MeshBuilder.CreateBox('box', meshOptions, this.world.scene);
    }
}


