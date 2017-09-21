import * as React from 'react';
import {observer} from 'mobx-react';
import {spellCategories,getSpellIdsFromCategory} from '../../spells/spellTools';
import './style/Root.css';



export default observer(function Root(props:any/*todo import from data model*/){

    return(
        <div>
            <img id="cross" src="/assets/ui/cross.png"/>


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




        </div>
    );
})