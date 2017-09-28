import * as React from 'react';
import {observer} from 'mobx-react';
import DataModel from '../../data-model';
import './style/Messages.css';



export default observer(({dataModel}:{dataModel:DataModel})=> {
    return (
        <div id="messages">
            {dataModel.messages.map((message)=>(
                <div className="message">
                    {message.text}
                </div>
            ))}

        </div>
    );
});