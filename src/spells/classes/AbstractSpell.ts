import * as BABYLON from 'babylonjs';
import MaterialFactory from '../../scene/classes/MaterialFactory';

export enum spellPhases{
    PREPARING,
    EXECUTING,
    FINISHED
}

export default class AbstractSpell{

    constructor(
        //public targetMeshes:BABYLON.AbstractMesh[],
        //public targetPoints:BABYLON.Vector3[],
        public costCallback:(energy:number)=>boolean,
        public gainCallback:(energy:number)=>void,
        public otherPlayerSpell:AbstractSpell[],
        public playerMesh:BABYLON.AbstractMesh,
        //public groundMesh:BABYLON.AbstractMesh,
        public materialFactory:MaterialFactory,
        public scene:BABYLON.Scene,
    ){
        //this._setPhase(spellPhases.PREPARING);
    }

    private _phase:spellPhases = spellPhases.PREPARING;
    private _phaseSubscribers:(()=>void)[] = [];
    private _setPhase(phase:spellPhases){
        this._phase = phase;
        this._phaseSubscribers.forEach((subscriberCallback:()=>void)=>{
            setImmediate(()=>{subscriberCallback();});
        });
    }

    get phase():spellPhases{
        return this._phase;
    }
    subscribe(subscriberCallback:()=>void){
        this._phaseSubscribers.push(subscriberCallback);
    }

    public released = false;//todo get released _released
    private _releasedSubscribers:(()=>void)[] = [];
    subscribeOnRelease(subscriberCallback:()=>void){
        this._releasedSubscribers.push(subscriberCallback);
    }


    public targets:BABYLON.PickingInfo[] = [];
    addTarget(target:BABYLON.PickingInfo){
        if(this.phase !== spellPhases.PREPARING) {
            throw new Error(`Target can be added only in PREPARING(${spellPhases.PREPARING}) state.`);
        }else
        if(this.released){
            throw new Error(`Target can not be added to released spell.`);
        }else{

            this.targets.push(target);
        }
    }
    get firstTargetMesh():BABYLON.AbstractMesh{
        return this.targets[0].pickedMesh;
    }

    release(){
        if(!this.released){
            this.released=true;
            this._releasedSubscribers.forEach((subscriberCallback:()=>void)=>{
                setImmediate(()=>{subscriberCallback();});
            });
        }else{
            throw new Error(`Spell is already released.`);
        }
    }


    execute(){
        if(this.phase === spellPhases.PREPARING){
            this._setPhase(spellPhases.EXECUTING);
        }else{
            throw new Error(`Method execute() can be called only in PREPARING(${spellPhases.PREPARING}) state not ${this.phase}.`);
        }
    }

    tick(tickDuration:number){
        if(this.phase === spellPhases.EXECUTING) {
        }else{
            throw new Error(`Method tick() can be called only in EXECUTING(${spellPhases.EXECUTING}) state not ${this.phase}.`);
        }
    }

    finish(){
        if(this.phase === spellPhases.EXECUTING) {
            this._setPhase(spellPhases.FINISHED);
            if(!this.released){
                this.release();
            }
        }else{
            throw new Error(`Method finish() can be called only in EXECUTING(${spellPhases.EXECUTING}) state not ${this.phase}.`);
        }
    }
}