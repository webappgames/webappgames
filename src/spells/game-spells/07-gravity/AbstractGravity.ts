import * as BABYLON from 'babylonjs';
import IPickingInfo from '../../../interfaces/IPickingInfo';
import AbstractSpell from '../../classes/AbstractSpell';
import {spellPhases} from '../../classes/AbstractSpell';

export default class AbstractGravity extends AbstractSpell{

    //private PRICE_PER_SECOND = 10;

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

    private _normalGravity:BABYLON.Vector3;

    modifyGravity(normalGravity:BABYLON.Vector3):BABYLON.Vector3{
        return normalGravity;
    }

    execute() {
        super.execute();
        this._normalGravity = this.world.scene.getPhysicsEngine().gravity;
        this.world.scene.getPhysicsEngine().setGravity(this.modifyGravity(this._normalGravity));

        /*setTimeout(()=>{
            this.release();
        },1000);*/

    }

    release(){
        super.release();
        this.kill();
    }

    kill(){
        super.kill();
        if(this._normalGravity instanceof BABYLON.Vector3) {
            this.world.scene.getPhysicsEngine().setGravity(this._normalGravity.scale(1));
        }

    }

}