import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';

export default class Pull extends AbstractSpellOnMeshes{

    public EFFECT_COLORS = {
        color1: '#00ffff',
        color2: '#0100ff'
    };

    get price():number{
        return 0;
    }

    get scale():number{
        return 0;
    }

    finish(){
        super.finish();
        const volume = this.firstTargetBrick.volume;//countVolume(this.targets[0].pickedMesh);
        this.firstTargetBrick.linearVelocity = this.direction.scale(this.scale/volume);
    }
}