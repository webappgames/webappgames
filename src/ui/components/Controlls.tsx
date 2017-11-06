import * as React from 'react';
import {observer} from 'mobx-react';
import UIDataModel from '../UIDataModel';
import Saver from '../../saver';
import './style/Controlls.css';



export default observer(({uiDataModel,saver}:{uiDataModel:UIDataModel,saver:Saver})=>{
    return (
        <div id="controlls">

            {/*{uiDataModel.fps.toFixed(0)}fps*/}
            <span style={{display:'none'}}>{uiDataModel.version}</span>

            <button onClick={()=>{saver.save();uiDataModel.version++}}>
                Save
            </button>

            <ul>
                {saver.loadAllSaveIds().map((saveId)=>(
                    <li key={saveId}>
                        <span className="save-id">
                            {saveId}
                        </span>
                        <button onClick={()=>{saver.load(saveId);uiDataModel.version++}}>
                            Load
                        </button>
                        <button onClick={()=>{saver.remove(saveId);uiDataModel.version++}}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>


        </div>
    );
});