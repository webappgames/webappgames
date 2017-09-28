import * as React from 'react';
import {observer} from 'mobx-react';
import log from '../../tools/log';
import DataModel from '../../data-model';
import Saver from '../../saver';
import Cross from './Cross';
import SpellCurrent from './SpellCurrent';
import SpellMenu from './SpellMenu';
import Counters from './Counters';
import Controlls from './Controlls';
import Messages from './Messages';
import './style/Root.css';

export default observer(({dataModel,saver}:{dataModel:DataModel,saver:Saver})=>{
    log.send('Rendring UI.');
    return(
        <div>
            <Cross dataModel={dataModel}/>{/*todo maybe use provider*/}
            <SpellCurrent dataModel={dataModel}/>
            <SpellMenu dataModel={dataModel}/>
            <Counters dataModel={dataModel}/>
            <Controlls dataModel={dataModel} saver={saver}/>
            <Messages dataModel={dataModel}/>
        </div>
    );
});