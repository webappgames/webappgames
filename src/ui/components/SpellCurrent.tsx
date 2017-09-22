import * as React from 'react';
import {observer} from 'mobx-react';
//import {spellCategories,getSpellIdsFromCategory} from '../../spells/spellTools';
import DataModel from '../../data-model';
import './style/SpellCurrent.css';



export default observer(({dataModel}:{dataModel:DataModel})=> {
    return (
        <div id="current-spell">
            {dataModel.currentSpellId}
        </div>
    );
});