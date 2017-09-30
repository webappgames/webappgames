import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';
import {countVolume} from '../../../tools/babylon';

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
        const volume = countVolume(this.targets[0].pickedMesh);
        this.firstTargetMesh.physicsImpostor.setLinearVelocity(this.direction.scale(this.scale/volume));
    }
}