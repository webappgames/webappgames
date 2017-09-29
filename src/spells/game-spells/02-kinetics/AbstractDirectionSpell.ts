import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';

export default class Pull extends AbstractSpellOnMeshes{

    public EFFECT_COLORS = {
        color1: '#0700ff',
        color2: '#8000ff'
    };

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