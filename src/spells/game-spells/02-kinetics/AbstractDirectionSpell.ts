import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';

export default class Pull extends AbstractSpellOnMeshes{

    get price():number{
        return 0;
    }

    get scale():number{
        return 0;
    }

    finish(){
        super.finish();
        this.firstTargetMesh.physicsImpostor.setLinearVelocity(this.direction.scale(this.scale));
    }
}