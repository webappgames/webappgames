import * as BABYLON from 'babylonjs';
import AbstractSpell from '../../classes/AbstractSpell';
import {spellPhases} from '../../classes/AbstractSpell';

export default class Fly extends AbstractSpell{

    private PRICE_PER_SECOND = 10;

    //todo better addTarget
    addTarget(target:BABYLON.PickingInfo){
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
        this.playerMesh.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,10,0));

        this.costCallback(this.PRICE_PER_SECOND/1000*tickDuration);
    }





}