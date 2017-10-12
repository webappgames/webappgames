import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';

export default class Meteorite extends AbstractSpellOnMeshes{

    public ALLOW_GROUND = true;

    public EFFECT_COLORS = {
        color1: '#ff81f0',
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
        this.world.setMeteoriteTarget(this.targets[0].pickedPoint);
    }

}