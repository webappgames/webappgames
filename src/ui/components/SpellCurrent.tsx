import * as React from 'react';
import {observer} from 'mobx-react';
//import {spellCategories,getSpellIdsFromCategory} from '../../spells/spellTools';
import UIDataModel from '../data-model';
import './style/SpellCurrent.css';



export default observer(({uiDataModel}:{uiDataModel:UIDataModel})=> {
    return (
        <div id="current-spell">
            {uiDataModel.currentSpellId}
        </div>
    );
});