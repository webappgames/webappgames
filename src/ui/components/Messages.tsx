import * as React from 'react';
import {observer} from 'mobx-react';
import UIDataModel from '../data-model';
import './style/Messages.css';



export default observer(({uiDataModel}:{uiDataModel:UIDataModel})=> {




    return (
        <div id="messages">

            {uiDataModel.messages
                //.filter((message,iterator)=>iterator===uiDataModel.messages.length-1)
                .map((message,iterator)=>(
                <div key={iterator} className="message">
                    {message.text}
                </div>
            ))}

        </div>
    );
});