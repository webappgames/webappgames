import * as React from 'react';
import {observer} from 'mobx-react';
import log from '../../tools/log';
import {spellCategories,getSpellIdsFromCategory} from '../../spells/spellTools';
import './style/Root.css';



export default observer(function Root(props:any/*todo import from data model*/){
    log.send('Rendring UI.');
    return(
        <div>
            <img id="cross" src={`/assets/ui/cross${props.data.aimed?'-aimed':''}.png`}/>


            <div id="current-spell">
                {props.data.currentSpellId}
            </div>




            <div id="spells">

                <ol className="spells-categories">
                    {spellCategories.map((category)=>(
                        <li key={category} className={props.data.currentSpellCategory===category?'current':''}>{category}</li>
                    ))}
                </ol>

                <ol className="spells-category-spells">
                    {getSpellIdsFromCategory(props.data.currentSpellCategory).map((spellId)=>(
                        <li key={spellId} className={props.data.currentSpellId===spellId?'current':''}>{spellId}</li>
                    ))}
                </ol>
            </div>




            <div id="counters">
                <div className="health">
                    78%
                </div>
                <div className="energy">
                    10&nbsp;000Mwh
                </div>
            </div>


        </div>
    );
})