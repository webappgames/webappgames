import * as BABYLON from 'babylonjs';
import AbstractSpell from '../../classes/AbstractSpell';
import {spellPhases} from '../../classes/AbstractSpell';

export default class Fly extends AbstractSpell{

    //todo better addTarget
    addTarget(target:BABYLON.PickingInfo){
        target;//no action
        if(this.phase===spellPhases.EXECUTING){
            this.finish();
        }

    }

    tick(tickDuration:number) {
        super.tick(tickDuration);
        this.playerMesh.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,10,0));
    }





}