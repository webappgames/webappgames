import request from '../../tools/request';
import * as BABYLON from 'babylonjs';
//import * as _ from 'lodash';
import SoundFactory from './SoundFactory';
import Structure from "./Structure";
import {isNull} from "util";

//todo class Structure
/*
todo material props


textureScale
materialPhysicOptions
soundSettings

*/

interface IMaterial {
    id: string;
    babylonMaterial: BABYLON.StandardMaterial;
    physicsOptions: {
        mass: number,
        restitution: number,
        friction: number
    }
}

const DEFAULT_PHYSICS_OPTIONS = {
    mass: 100,
    restitution: 0.002,
    friction: 1
};

//todo rename to StructuresFactory
export default class MaterialFactory {


    private _structuresCache: Structure[];


    constructor(private _soundFactory: SoundFactory,
                private _scene: BABYLON.Scene) {
        this._soundFactory;//todo remove
        this._structuresCache = [];
    }


    async getStructure(materialId: string): Promise<Structure> {

        const cashedMaterial = this._structuresCache.find((material) => material.id === materialId) || null;

        if (cashedMaterial) {
            return cashedMaterial;
        } else {
            console.log(`Creating structure "${materialId}".`);

            const babylonMaterial = new BABYLON.StandardMaterial(materialId, this._scene);
            babylonMaterial.backFaceCulling = false;//todo repair mesh builder

            let structure: IMaterial = {
                id: materialId,
                babylonMaterial,
                physicsOptions: Object.assign({},DEFAULT_PHYSICS_OPTIONS)
            };


            try {
                const result = await request(process.env.PUBLIC_URL + `/assets/materials/${materialId}/material.json`);
                const structureConfig = JSON.parse(result);
                //console.log(structureConfig);

                const root = process.env.PUBLIC_URL + `/assets/materials/${materialId}/`;
                const defaultTexture = parseTextureConfig(structureConfig.textures.default, root, this._scene, null);

                if ('textures' in structureConfig) {
                    for (const textureType of ['ambient', 'diffuse', 'specular', 'emissive', 'bump']) {
                        if (textureType in structureConfig.textures) {
                            const colorOrTexture = parseTextureConfig(structureConfig.textures[textureType], root, this._scene, defaultTexture);
                            if(colorOrTexture instanceof BABYLON.Color3){
                                structure.babylonMaterial[textureType + 'Color'] = colorOrTexture;
                            }else
                            if(colorOrTexture instanceof BABYLON.Texture){
                                structure.babylonMaterial[textureType + 'Texture'] = colorOrTexture;
                            }
                        }
                    }
                }


                if ('physics' in structureConfig) {
                    for (const physicsOption of ['mass', 'restitution', 'friction']) {
                        structure.physicsOptions[physicsOption] = structureConfig.physics[physicsOption] || structure.physicsOptions[physicsOption];
                    }
                }

            } catch (error) {
                console.warn(error);
                throw new Error(`Problem of config in material "${materialId}". See more in console.`);
            }


            this._structuresCache.push(structure);
            return structure;

        }
    }


    /*applyMaterial(mesh: BABYLON.AbstractMesh, materialName = 'stone-plain', impostor = BABYLON.PhysicsImpostor.BoxImpostor) {

        if ('physicsImpostor' in mesh) {
            if (!mesh.physicsImpostor.isDisposed) {
                mesh.physicsImpostor.dispose();
            }
        }
        mesh.physicsImpostor = new BABYLON.PhysicsImpostor(mesh, impostor, DEFAULT_PHYSICS_OPTIONS, this._scene);


        this.getStructure(materialName).then((material) => {

            mesh.material = material.babylonMaterial;
            //mesh.physicsImpostor.setMass(material.physicsOptions.mass);
            //todo is it ok?
            //mesh.physicsImpostor.restitution = material.physicsOptions.restitution;
            //mesh.physicsImpostor.friction = material.physicsOptions.friction;

        });
    }*/

}


function parseTextureConfig(textureConfig: null | string | { src?: string, color?: string, uScale?: number, vScale?: number, uOffset?: number, vOffset?: number }, root: string, scene: BABYLON.Scene, defaultTexture: BABYLON.Color3 | BABYLON.Texture | null): BABYLON.Color3 | BABYLON.Texture | null {
    if (typeof textureConfig === 'string') {
        if (textureConfig === 'default') {
            return defaultTexture;
        }
        if (textureConfig.substring(0, 1) === '#') {
            textureConfig = {
                color: textureConfig
            }
        } else {
            textureConfig = {
                src: textureConfig
            }
        }
    }
    if (isNull(textureConfig)) {
        textureConfig = {};
    }
    if (typeof textureConfig === 'object') {
        if ('color' in textureConfig) {
            return BABYLON.Color3.FromHexString(textureConfig.color as string);
        } else if ('src' in textureConfig) {

            const texture = new BABYLON.Texture(root + textureConfig.src, scene);
            for (const textureParam of ['uScale', 'vScale', 'uOffset', 'vOffset']) {
                if (textureParam in textureConfig) {
                    texture[textureParam] = textureConfig[textureParam];
                }
            }

            return texture;

        }

    }

    return null;
}


/*let textureScale=1;
      if(materialId==='grass'){
          textureScale=100;
      }

      const material = new BABYLON.StandardMaterial(materialId, this._scene);
      material.backFaceCulling = false;
      const texture = new BABYLON.Texture(process.env.PUBLIC_URL +`/assets/textures/${materialId}.jpg`, this._scene);
      texture.uScale = textureScale;
      texture.vScale = textureScale;
      material.diffuseTexture = texture;

      material.specularColor = BABYLON.Color3.FromHexString('#ffeacb');
      //material.emissiveColor = BABYLON.Color3.FromHexString('#00ff00');
      material.emissiveTexture = texture;

      if(materialId==='stone-bricks') {
          material.bumpTexture = new BABYLON.Texture(process.env.PUBLIC_URL +`/assets/textures/${materialId}-bump.png`, this._scene);
      }


      this._materialsCache.push(material);
      return material;*/
/*

if (materialName === 'stone-plain-ghost') return;


            if (materialName === 'stone-plain-freezed') {
                materialPhysicOptions.mass = 0;
            }

            if (materialName === 'meteorite') {
                materialPhysicOptions.mass = 200;
            }

            if (materialName === 'itnetwork_summer_2017') {
                materialPhysicOptions.mass = 1;
            }


            if (materialName === 'wood-fence') {
                materialPhysicOptions.mass = 10;
                //materialPhysicOptions.restitution = 0;
                //materialPhysicOptions.friction = 100;
            }


            const stepSound = this._soundFactory.getMeshSound('step-stairs', mesh);

            _;
            stepSound;
            /*!todo const playSound = _.throttle((volume:number,playbackRate:number)=>{

                stepSound.setVolume(volume);
                stepSound.setPlaybackRate(playbackRate);

                console.log(`${volume} ${playbackRate}`);
                stepSound.play()

            },100);


            let lastEnergy = 0;
            mesh.physicsImpostor.registerAfterPhysicsStep(()=>{

                const currentEnergy = countEnergy(mesh);
                const energyDelta = currentEnergy - lastEnergy;
                lastEnergy = currentEnergy;

                if(energyDelta<-100){

                    playSound(
                        countVolume(mesh)*-energyDelta/10000,
                        1//Math.sqrt(100/countVolume(mesh))
                    );
                }


            })/**/


/*sphereImpostor.registerOnPhysicsCollide(undefined, function(main, collided) {
    console.log('boom');
    stepSound.play();
});*/


/*mesh.physicsImpostor.registerBeforePhysicsStep(()=>{
    //const angularVelocity = mesh.physicsImpostor.getAngularVelocity();
    //mesh.physicsImpostor.setAngularVelocity(angularVelocity.add(new BABYLON.Vector3(.1,0,0)));
    mesh.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0,0,0));
});*/


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

});





*/
