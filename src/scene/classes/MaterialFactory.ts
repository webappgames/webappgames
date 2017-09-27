import * as BABYLON from 'babylonjs';

export default class MaterialFactory{

    constructor(
        private scene:BABYLON.Scene
    ){}


    getMaterial(
        name:string,
        textureScale:number=1
    ){


        const material = new BABYLON.StandardMaterial("name", this.scene);
        const texture = new BABYLON.Texture(`/assets/textures/${name}.jpg`, this.scene);
        texture.uScale=textureScale;
        texture.vScale=textureScale;
        material.diffuseTexture = texture;
        //material.specularColor = BABYLON.Color3.FromHexString('#ff0000');
        //material.emissiveColor = BABYLON.Color3.FromHexString('#00ff00');
        return material;


    }

}


