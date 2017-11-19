import * as BABYLON from 'babylonjs';
import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';

export default class Pillar extends AbstractSpellOnMeshes{

    public EFFECT_COLORS = {
        color1: '#fff400',
        color2: '#ff3b00'
    };

    get price():number{
        return 0;
    }

    public ALLOW_GROUND = true;


    //todo addTarget errors

    finish(){
        super.finish();
        const boxMesh = BABYLON.Mesh.CreateBox("pillar", 1, this.world.scene);
        boxMesh.position = this.targets[0].pickedPoint.add(new BABYLON.Vector3(0,5,0));
        boxMesh.scaling = new BABYLON.Vector3(1,10,1);
        //boxMesh.rotation = this.targetMesh.rotation.clone();
        boxMesh.material = this.world.materialFactory.getBabylonMaterial('stone-plain');


        boxMesh.physicsImpostor = new BABYLON.PhysicsImpostor(boxMesh, BABYLON.PhysicsImpostor.BoxImpostor, {
            mass: 100,
            restitution: 0.2
        }, this.world.scene);
    }
}