import * as React from 'react';
import {observer} from 'mobx-react';
import DataModel from '../../data-model';
import Saver from '../../saver';
import './style/Controlls.css';



export default observer(({dataModel,saver}:{dataModel:DataModel,saver:Saver})=>{
    return (
        <div id="controlls">

            {dataModel.fps.toFixed(0)}fps

            <button onClick={()=>saver.save()}>
                Uložit
            </button>

            <ul>
                {saver.loadAllSaveIds().map((saveId)=>(
                    <li key={saveId}>
                        <button onClick={()=>saver.load(saveId)}>
                            Load
                        </button>
                        <button onClick={()=>saver.remove(saveId)}>
                            Delete
                        </button>
                        {saveId}
                    </li>
                ))}
            </ul>


        </div>
    );
});