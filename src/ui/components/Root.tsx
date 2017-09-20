import * as React from 'react';
import {getSpellById} from '../../spells/spellTools';
import './style/Root.css';

export interface IUIData{
    currentSpellId: string
}

export default function Root(props:{data:IUIData}){

    return(
        <div>
            <img id="cross" src="/assets/ui/cross.png"/>


            <div id="current-spell">
                {getSpellById(props.data.currentSpellId).title}
            </div>



        </div>
    );
}