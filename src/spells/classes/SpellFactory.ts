import AbstractSpell from './AbstractSpell';
import World from '../../world/classes/World';
import {getSpellById} from '../tools/index';

class SpellFactory{

    constructor(){
    }

    createSpell(
        spellId:string,
        costCallback:(energy:number)=>void,
        gainCallback:(energy:number)=>void,
        otherPlayerSpell:AbstractSpell[],
        world:World,
    ):AbstractSpell{
        //todo better
        return new (getSpellById(spellId))(
            costCallback,
            gainCallback,
            otherPlayerSpell,
            world
        );
    }
}

//todo remove singleton
export default new SpellFactory();