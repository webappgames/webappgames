import {observable,computed} from "mobx";
import {getCategoryFromSpellId} from '../spells/tools/index';

interface IMessage{date:Date,text:string}
interface IVector2{x:number,y:number}
interface ILinkArea{position:IVector2,size:IVector2,title:string,url:string}

export default class DataModel {
    //@observable currentSpellId = 'trolololololo';
    @observable currentSpellId = 'pull';
    @computed get currentSpellCategory() {
        return getCategoryFromSpellId(this.currentSpellId)
    }
    @observable health = 1;
    @observable energy = 10000000000;



    /*@observable aimed = false;
    //@observable aimedEnergyCost = NaN;
    //@observable aimedMessage:string = '';
    @computed get aimStatus():string {
        if(!this.aimed){
            return '';
        }else{
            if(this.aimedEnergyCost<=this.energy)
                return '-aimed';
            else
                return '-aimed-disabled';
        }
    }*/



    @observable messages:IMessage[] = [];
    private messagesTimeout:any;
    sendMessage(text:string){
        this.messages=[{
            text,
            date: new Date()
        }];


        clearTimeout(this.messagesTimeout);
        this.messagesTimeout = setTimeout(()=>this.filterMessages(),2000);
    }


    private filterMessages(){

        this.messages=[];
        /*const date = new Date();

        this.messages = this.messages.filter((message)=>{
            return (message.date.getTime()>date.getTime()-2000)
        });*/

    }



    @observable locked = false;
    @observable linkAreas:ILinkArea[] = [];




}
/*
todo
    Game{
        player: DataModel
        spells: Spell[]
        scenes: {...meshes....}[]
    }
*/