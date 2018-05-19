import {default as AbstractSpell, spellPhases} from '../../../spells/classes/AbstractSpell';
import spellFactory from '../../../spells/classes/SpellFactory';
import {neighbourSpell} from '../../../spells/tools/index';
import Player from './index';
import * as _ from "lodash";
import IPickingInfo from '../../../interfaces/IPickingInfoPicked';

export default function setPlayerSpells(
    player:Player,
    options: {updateLabel:(label:string)=>void}
):{
    addTarget: (pick: IPickingInfo)=>void,
    neighbourSpell: (direction:1|-1)=>void
}{


    
    const allSpells:AbstractSpell[] = [];
    let lastTick = performance.now();
    player.world.scene.registerBeforeRender(()=>{
        const thisTick = performance.now();
        const tickDuration = thisTick - lastTick;
        lastTick = thisTick;

        //todo garbage collector
        allSpells.forEach((spell:AbstractSpell)=>{
            if(spell.phase===spellPhases.EXECUTING) {
                spell.tick(tickDuration);
            }
        });

    });

    let spell:AbstractSpell;
    const createNewSpell = ()=>{

        options.updateLabel(player.world.uiDataModel.currentSpellId);

        if(!(spell||{released:true}/*todo better*/).released) {
            spell.release();
        }else {
            spell = spellFactory.createSpell(
                player.world.uiDataModel.currentSpellId,
                (energyCost: number) => {
                    /*todo survival mode
                     if (energyCost > uiDataModel.energy) {
                     throw new Error('Not enough resources.');
                     }
                     uiDataModel.energy -= energyCost;
                     return true;*/
                },
                (energyGain: number) => {
                },
                [],//todo other player spells
                player.world
            );

            spell.subscribeOnRelease(() => {
                createNewSpell();
            });

            allSpells.push(spell);
        }
    }
    createNewSpell();




    //todo 1 adapter for events
    const onWheel = _.throttle((event:WheelEvent)=>{
        if(event.deltaY>0){
            player.world.uiDataModel.currentSpellId = neighbourSpell(player.world.uiDataModel.currentSpellId,1);
            createNewSpell();
        }else
        if(event.deltaY<0){
            player.world.uiDataModel.currentSpellId = neighbourSpell(player.world.uiDataModel.currentSpellId,-1);
            createNewSpell();
        }
    },50, {leading:true,trailing:false});

    //todo method on World class to set listeners
    player.world.canvasElement.addEventListener("wheel", onWheel, false);


    return {
        addTarget: (pick: IPickingInfo)=>{
            spell.addTarget(pick);
        },
        neighbourSpell: (direction)=>{
            //console.log('neighbourSpell',direction);
            player.world.uiDataModel.currentSpellId = neighbourSpell(player.world.uiDataModel.currentSpellId,direction);
            createNewSpell();
        }
    }
}