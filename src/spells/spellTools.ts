import spells from './game-spells';

export const spellIds = Object.keys(spells);

export function getSpellById(spellId:string){
    if(spellId in spells){
        return spells[spellId];
    }else{
        throw new Error(`Unknown spell "${spellId}".`);
    }
}

export function neighbourSpell(spellId:string,indexDiff=1){

    const spellIndex = spellIds.indexOf(spellId);
    if(spellIndex===-1){
        throw new Error(`Unknown spell "${spellId}".`);
    }

    return spellIds[(spellIndex+indexDiff)%spellIds.length];
}