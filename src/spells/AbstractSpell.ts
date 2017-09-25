import * as BABYLON from 'babylonjs';

export enum spellPhases{
    PREPARING,
    PREPARED,
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
        public scene:BABYLON.Scene,
    ){
        this._setPhase(spellPhases.PREPARING);
    }

    private _phase:spellPhases;
    private _phaseSubscribers:(()=>void)[];
    private _setPhase(phase:spellPhases){
        this._phase = phase;
        this._phaseSubscribers.forEach((subscriberCallback:()=>void)=>{
            setImmediate(()=>{subscriberCallback});
        });
    }

    get phase():spellPhases{
        return this._phase;
    }
    subscribe(subscriberCallback:()=>void){
        this._phaseSubscribers.push(subscriberCallback);
    }

    public targets:BABYLON.PickingInfo[];
    addTarget(target:BABYLON.PickingInfo){
        this.targets.push(target);
        if(this.isPrepared){
            this._setPhase(spellPhases.PREPARED);
        }
    }

    //this is overwritten by extended classes
    public isPrepared=false;
    public message = '';


    execute(){
        if(this.phase === spellPhases.PREPARED){
            this._setPhase(spellPhases.EXECUTING);
        }else{
            throw new Error(`Method execute() can be called only in PREPARED state.`);
        }
    }

    tick(tickDuration:number){
        if(this.phase === spellPhases.EXECUTING) {
        }else{
            throw new Error(`Method tick() can be called only in EXECUTING state.`);
        }
    }

    finish(){
        if(this.phase === spellPhases.EXECUTING) {
            this._setPhase(spellPhases.FINISHED);
        }else{
            throw new Error(`Method finish() can be called only in EXECUTING state.`);
        }
    }
}