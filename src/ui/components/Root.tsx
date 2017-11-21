import * as React from 'react';
import {observer} from 'mobx-react';
import UIDataModel from '../UIDataModel';
import Saver from '../../saver';
import Cross from './Cross';
import SpellCurrent from './SpellCurrent';
import SpellMenu from './SpellMenu';
import Counters from './Counters';
import Controlls from './Controlls';
import Messages from './Messages';
import LinkAreas from './LinkAreas';
import Stat from './Stat';
import './style/Root+index.css';

export default observer(({uiDataModel,saver}:{uiDataModel:UIDataModel,saver:Saver})=>{
    console.log('Rendring UI.');
    return(
        <div>
            <Cross uiDataModel={uiDataModel}/>{/*todo maybe use provider*/}
            <SpellCurrent uiDataModel={uiDataModel}/>
            <SpellMenu uiDataModel={uiDataModel}/>
            <Counters uiDataModel={uiDataModel}/>
            <Controlls uiDataModel={uiDataModel} saver={saver}/>
            <Messages uiDataModel={uiDataModel}/>
            <LinkAreas uiDataModel={uiDataModel}/>
            <Stat uiDataModel={uiDataModel}/>
        </div>
    );
});