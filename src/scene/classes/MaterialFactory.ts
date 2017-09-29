import log from '../../tools/log';
import * as BABYLON from 'babylonjs';

export default class MaterialFactory{


    private materialsCache:BABYLON.StandardMaterial[];


    constructor(
        private scene:BABYLON.Scene
    ){
        this.materialsCache = [];
    }


    getMaterial(
        materialName:string,
        textureScale:number=1,
        //freezed:boolean=false
    ){


        const cashedMaterial = this.materialsCache.find((material)=>material.name === materialName)||null;

        if(cashedMaterial){
            return cashedMaterial;
        }else {
            log.send(`Creating material "${materialName}".`);

            const material = new BABYLON.StandardMaterial(materialName, this.scene);
            const texture = new BABYLON.Texture(`/assets/textures/${materialName}.jpg`, this.scene);
            texture.uScale = textureScale;
            texture.vScale = textureScale;
            material.diffuseTexture = texture;

            //material.specularColor = BABYLON.Color3.FromHexString('#ff0000');
            //material.emissiveColor = BABYLON.Color3.FromHexString('#00ff00');

            this.materialsCache.push(material);
            return material;
        }


    }


    applyMaterial(mesh:BABYLON.AbstractMesh,materialName='stone-plain'){
        mesh.material = this.getMaterial(materialName);
        if('physicsImpostor' in mesh) {
            if (!mesh.physicsImpostor.isDisposed) {
                mesh.physicsImpostor.dispose();
            }
        }
        mesh.physicsImpostor = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsImpostor.BoxImpostor, {
            mass: 100,
            restitution:0.002,
            //friction:100
        }, this.scene);


        /*mesh.physicsImpostor.registerBeforePhysicsStep(()=>{

            const linearVelocity = mesh.physicsImpostor.getLinearVelocity();
            const angularVelocity = mesh.physicsImpostor.getAngularVelocity();


            //mesh.physicsImpostor.setLinearVelocity(linearVelocity.scale(.5));
            //mesh.physicsImpostor.setAngularVelocity(angularVelocity.scale(.5));


            if(angularVelocity.length()<1){
                //mesh.physicsImpostor.setAngularVelocity(angularVelocity.scale(-1));
            }


            if(linearVelocity.length()<2){
                //mesh.physicsImpostor.setLinearVelocity(linearVelocity.scale(-1));
                mesh.physicsImpostor.setLinearVelocity(linearVelocity.scale(0));
            }

        });*/



    }







}


