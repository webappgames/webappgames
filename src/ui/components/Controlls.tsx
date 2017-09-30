import * as React from 'react';
import {observer} from 'mobx-react';
import DataModel from '../../data-model';
import Saver from '../../saver';
import './style/Controlls.css';



export default observer(({dataModel,saver}:{dataModel:DataModel,saver:Saver})=>{
    return (
        <div id="controlls">
            <button onClick={()=>saver.downloadXml()}>
                Uložit
            </button>


        </div>
    );
});