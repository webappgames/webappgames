import * as React from 'react';
import './style/Root.css';


interface ISpell{
    name: string
}

export interface IUIData{
    spells: ISpell[],
    spellCurrent: number
}


export default function Root(props:{data:IUIData}){

    return(
        <div>
            <img id="cross" src="/assets/ui/cross.png"/>


            <div id="current-spell">
                {props.data.spells[props.data.spellCurrent].name}
            </div>



        </div>
    );
}