import * as BABYLON from 'babylonjs';
import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';

export default class AbstractSplit extends AbstractSpellOnMeshes{

    public EFFECT_COLORS = {
        color1: '#45ff00',
        color2: '#8000ff'
    };

    get splitParts():{x:number,y:number,z:number}{
        return {
            x:1,
            y:2,
            z:3
        }
    }

    get price():number{
        return 0;
    }

    finish(){
        super.finish();
        this.firstTargetMesh.dispose();

        const parts = this.splitParts;

        for(let z=0;z<parts.z;z++) {
            const zC = (z + .5) * (1 / parts.z);
            for (let y = 0; y < parts.y; y++) {
                const yC = (y + .5) * (1 / parts.y);
                for (let x = 0; x < parts.x; x++) {
                    const xC = (x + .5) * (1 / parts.x);


                    const boxMesh = BABYLON.Mesh.CreateBox("box", 1, this.scene);


                    boxMesh.position = this.firstTargetMesh.position.add(this.firstTargetMesh.scaling.multiplyByFloats(xC - .5,yC - .5,zC - .5));


                    boxMesh.scaling = this.firstTargetMesh.scaling.multiplyByFloats(1/parts.x,1/parts.y,1/parts.z);
                    boxMesh.rotation = this.firstTargetMesh.rotation.clone();
                    boxMesh.material = this.firstTargetMesh.material.clone('clonedMaterial');


                    boxMesh.physicsImpostor = new BABYLON.PhysicsImpostor(boxMesh, BABYLON.PhysicsImpostor.BoxImpostor, {
                        mass: 10,
                        restitution: 0.2
                    }, this.scene);

                }
            }
        }




    }
}