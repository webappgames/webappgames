import * as React from 'react';
import {observer} from 'mobx-react';
import log from '../../tools/log';
import DataModel from '../../data-model';
import Cross from './Cross';
import SpellCurrent from './SpellCurrent';
import SpellMenu from './SpellMenu';
import Counters from './Counters';
import './style/Root.css';

export default observer(({dataModel}:{dataModel:DataModel})=>{
    log.send('Rendring UI.');
    return(
        <div>
            <Cross dataModel={dataModel}/>{/*todo maybe use provider*/}
            <SpellCurrent dataModel={dataModel}/>
            <SpellMenu dataModel={dataModel}/>
            <Counters dataModel={dataModel}/>
        </div>
    );
});