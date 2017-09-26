import spells from '../game-spells';

export const spellCategories = Object.keys(spells);

const spellsFlat = (function(){
    let spellsFlat = {};
    for(let spellCategory of spellCategories){
        for(let spellId of getSpellIdsFromCategory(spellCategory)){
            spellsFlat[spellId] = spells[spellCategory][spellId];
        }
    }
    return spellsFlat;
})();

export function getSpellById(spellId:string){
    if(spellId in spellsFlat){
        return spellsFlat[spellId];
    }else{
        throw new Error(`Unknown spell "${spellId}".`);
    }
}

const spellsFlatIds = Object.keys(spellsFlat);

export function neighbourSpell(spellId:string,indexDiff=1):string{

    const spellIndex = spellsFlatIds.indexOf(spellId);
    if(spellIndex===-1){
        throw new Error(`Unknown spell "${spellId}".`);
    }

    return spellsFlatIds[(spellIndex+indexDiff+spellsFlatIds.length)%spellsFlatIds.length];
}

export function getSpellIdsFromCategory(spellCategory:string):string[]{
    return Object.keys(spells[spellCategory]);
}

export function getCategoryFromSpellId(spellId:string):string{
    for(let spellCategory of spellCategories){
        if(getSpellIdsFromCategory(spellCategory).indexOf(spellId)!==-1){
            return(spellCategory);
        }
    }
    throw new Error(`Unknown spell "${spellId}".`);
}