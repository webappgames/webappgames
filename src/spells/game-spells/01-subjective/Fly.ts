import IPickingInfo from '../../../interfaces/IPickingInfo';
import AbstractSpell from '../../classes/AbstractSpell';
import {spellPhases} from '../../classes/AbstractSpell';

export default class Fly extends AbstractSpell{

    private PRICE_PER_SECOND = 10;

    //todo better addTarget
    addTarget(target:IPickingInfo){
        target;//no action
        if(this.phase===spellPhases.PREPARING){
            this.execute();
        }else
        if(this.phase===spellPhases.EXECUTING){
            this.finish();
        }
    }

    tick(tickDuration:number) {
        super.tick(tickDuration);
        this.world.player.mesh.physicsImpostor.setLinearVelocity(this.world.player.direction1.scale(45));
        this.costCallback(this.PRICE_PER_SECOND/1000*tickDuration);
    }

    release(){
        super.release();
        this.kill();
    }

}