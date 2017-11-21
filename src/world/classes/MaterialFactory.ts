import request from '../../tools/request';
import * as BABYLON from 'babylonjs';
//import * as _ from 'lodash';
import SoundFactory from './SoundFactory';
import {isNull} from "util";

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


export default class MaterialFactory {


    private _materialsCache: IMaterial[];


    constructor(private _soundFactory: SoundFactory,
                private _scene: BABYLON.Scene) {
        this._soundFactory;//todo remove
        this._materialsCache = [];
    }


    async getMaterial(materialId: string): Promise<IMaterial> {

        const cashedMaterial = this._materialsCache.find((material) => material.id === materialId) || null;

        if (cashedMaterial) {
            return cashedMaterial;
        } else {
            console.log(`Creating material "${materialId}".`);

            const babylonMaterial = new BABYLON.StandardMaterial(materialId, this._scene);
            babylonMaterial.backFaceCulling = false;//todo repair mesh builder

            let material: IMaterial = {
                id: materialId,
                babylonMaterial,
                physicsOptions: {
                    mass: 1,
                    restitution: 0.002,
                    friction: 1
                }
            };



            try {
                const result = await request(process.env.PUBLIC_URL + `/assets/materials/${materialId}/material.json`);
                const materialConfig = JSON.parse(result);
                console.log(materialConfig);

                if ('textures' in materialConfig) {
                    for (const textureType of ['ambient', 'diffuse', 'specular', 'emissive', 'bump']) {
                        if (textureType in materialConfig.textures) {

                            console.log(materialConfig.textures[textureType]);

                            if (typeof materialConfig.textures[textureType] === 'string') {
                                materialConfig.textures[textureType] = {
                                    src: materialConfig.textures[textureType]
                                }
                            }
                            if (isNull(materialConfig.textures[textureType])) {
                                materialConfig.textures[textureType] = {};
                            }
                            if (typeof materialConfig.textures[textureType] === 'object') {
                                if ('src' in materialConfig.textures[textureType]) {
                                    material.babylonMaterial[textureType + 'Texture'] = new BABYLON.Texture(process.env.PUBLIC_URL + `/assets/materials/${materialId}/` + materialConfig.textures[textureType].src, this._scene);
                                }


                                //todo color
                                //todo offset


                            }

                        }
                    }
                }


                if ('physics' in materialConfig) {
                    //materialConfig.physics.mass || 1;
                }

            } catch (error) {
                console.warn(error);
                throw new Error(`Problem of config in material "${materialId}". See more in console.`);
            }


            this._materialsCache.push(material);
            return material;

        }
    }


    applyMaterial(mesh: BABYLON.AbstractMesh, materialName = 'stone-plain', impostor = BABYLON.PhysicsImpostor.BoxImpostor) {

        if ('physicsImpostor' in mesh) {
            if (!mesh.physicsImpostor.isDisposed) {
                mesh.physicsImpostor.dispose();
            }
        }
        mesh.physicsImpostor = new BABYLON.PhysicsImpostor(mesh, impostor, DEFAULT_PHYSICS_OPTIONS, this._scene);


        this.getMaterial(materialName).then((material) => {

            mesh.material = material.babylonMaterial;
            mesh.physicsImpostor.setMass(material.physicsOptions.mass);
            //todo is it ok?
            mesh.physicsImpostor.restitution = material.physicsOptions.restitution;
            mesh.physicsImpostor.friction = material.physicsOptions.friction;

        });
    }
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
