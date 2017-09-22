import * as React from 'react';
import {observer} from 'mobx-react';
import {spellCategories,getSpellIdsFromCategory} from '../../spells/spellTools';
import DataModel from '../../data-model';
import './style/SpellMenu.css';



export default observer(({dataModel}:{dataModel:DataModel})=> {
    return (
        <div id="spells">

            <ol className="spells-categories">
                {spellCategories.map((category)=>(
                    <li key={category} className={dataModel.currentSpellCategory===category?'current':''}>{category}</li>
                ))}
            </ol>

            <ol className="spells-category-spells">
                {getSpellIdsFromCategory(dataModel.currentSpellCategory).map((spellId)=>(
                    <li key={spellId} className={dataModel.currentSpellId===spellId?'current':''}>{spellId}</li>
                ))}
            </ol>
        </div>
    );
});