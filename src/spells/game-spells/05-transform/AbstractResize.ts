import * as BABYLON from 'babylonjs';
import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';

export default class AbstractResize extends AbstractSpellOnMeshes{

    public EFFECT_COLORS = {
        color1: '#45ff00',
        color2: '#8000ff'
    };

    get price():number{
        return 0;
    }
    get scaling():number{
        return 1;
    }

    finish(){
        super.finish();

        //todo prevent duplicating
        //todo preserve velocity linear/angular
        const boxMesh = BABYLON.Mesh.CreateBox("box", 1, this.world.scene);
        boxMesh.position = this.firstTargetMesh.position.clone();
        boxMesh.scaling = this.firstTargetMesh.scaling.scale(this.scaling);
        boxMesh.rotation = this.firstTargetMesh.rotationQuaternion.toEulerAngles();
        this.world.materialFactory.applyMaterial(boxMesh,this.firstTargetMesh.material.name);
        this.firstTargetMesh.dispose();
    }

}