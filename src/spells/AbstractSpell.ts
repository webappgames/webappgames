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
        public costCallback:(cost:number)=>boolean,
        public gainCallback:(cost:number)=>boolean,
        public otherPlayerSpell:AbstractSpell[],
        public playerMesh:BABYLON.AbstractMesh,
        public scene:BABYLON.Scene,
    ){
        this.phase = spellPhases.PREPARING;
    }

    private _phase:spellPhases;
    private _phaseSubscribers:(()=>void)[];
    set phase(phase:spellPhases){
        this._phase = phase;
        this._phaseSubscribers.forEach((subscriberCallback:()=>void)=>{
            subscriberCallback();
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
            this.phase = spellPhases.PREPARED;
        }
    }

    //this is overwritten by extended classes
    public isPrepared=false;
    public message = '';


    execute(){
        if(this.phase === spellPhases.PREPARED){
            this.phase = spellPhases.EXECUTING;

            //todo new SpellEffect
        }
    }

    tick(){
        if(this.phase === spellPhases.EXECUTING) {
            //todo new SpellEffect...
        }
    }

    finish(){
        if(this.phase === spellPhases.EXECUTING) {
            this.phase = spellPhases.FINISHED;
            //todo new SpellEffect...
        }
    }
}