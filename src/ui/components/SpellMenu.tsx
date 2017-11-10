import * as React from 'react';
import {observer} from 'mobx-react';
import {spellCategories,getSpellIdsFromCategory} from '../../spells/tools/index';
import UIDataModel from '../UIDataModel';
import './style/SpellMenu.css';



export default observer(({uiDataModel}:{uiDataModel:UIDataModel})=> {
    return (
        <div id="spells">

            <ol className="spells-categories">
                {spellCategories.map((category,iterator)=>(
                    <li key={category} className={uiDataModel.currentSpellCategory===category?'current':''}>
                        {/*<img className="icon" src={`/assets/spells/spell.png`}/>*/}
                        [
                        <span className="order">{`${iterator+1}`}</span>
                        <span className="text">{category}</span>
                        ]
                        </li>
                ))}
            </ol>

            <ol className="spells-category-spells">
                {getSpellIdsFromCategory(uiDataModel.currentSpellCategory).map((spellId,iterator)=>(
                    <li key={spellId} className={uiDataModel.currentSpellId===spellId?'current':''}>
                        {/*<img className="icon" src={`/assets/spells/spell.png`}/>*/}
                        {`${iterator+1}) `}
                        <span className="text">{spellId}</span>

                        </li>
                ))}
            </ol>
        </div>
    );
});