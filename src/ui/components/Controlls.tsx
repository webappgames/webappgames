import * as React from 'react';
import {observer} from 'mobx-react';
import DataModel from '../../data-model';
import Saver from '../../saver';
import './style/Controlls.css';



export default observer(({dataModel,saver}:{dataModel:DataModel,saver:Saver})=>{
    return (
        <div id="controlls">

            {/*{dataModel.fps.toFixed(0)}fps*/}
            <span style={{display:'none'}}>{dataModel.version}</span>

            <button onClick={()=>{saver.save();dataModel.version++}}>
                Save
            </button>

            <ul>
                {saver.loadAllSaveIds().map((saveId)=>(
                    <li key={saveId}>
                        <span className="save-id">
                            {saveId}
                        </span>
                        <button onClick={()=>{saver.load(saveId);dataModel.version++}}>
                            Load
                        </button>
                        <button onClick={()=>{saver.remove(saveId);dataModel.version++}}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>


        </div>
    );
});