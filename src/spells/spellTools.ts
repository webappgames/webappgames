import spells from './game-spells';

const spellsFlat = (function(){
    let spellsFlat = {};
    for(let spellCathegory of Object.keys(spells)){
        for(let spellId of Object.keys(spells[spellCathegory])){
            spellsFlat[spellId] = spells[spellCathegory][spellId];
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

export function neighbourSpell(spellId:string,indexDiff=1){

    const spellIndex = spellsFlatIds.indexOf(spellId);
    if(spellIndex===-1){
        throw new Error(`Unknown spell "${spellId}".`);
    }

    return spellsFlatIds[(spellIndex+indexDiff)%spellsFlatIds.length];
}