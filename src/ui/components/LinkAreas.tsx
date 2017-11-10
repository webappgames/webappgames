import * as React from 'react';
import {observer} from 'mobx-react';
import UIDataModel from '../UIDataModel';
import './style/LinkAreas.css';


export default observer(({uiDataModel}:{uiDataModel:UIDataModel})=> {
    return (
        <div id="link-areas" style={{
            display: uiDataModel.locked?'none':'block'
        }}>

            {uiDataModel.linkAreas
                .map((linkArea,iterator)=>(
                    <a key={iterator} href={linkArea.url} target="_blank" className="link-area" style={{
                        zIndex: 30,
                        position: 'fixed',
                        left: linkArea.position.x-linkArea.size.x/2,
                        top: linkArea.position.y-linkArea.size.y/2,
                        width: linkArea.size.x,
                        height: linkArea.size.y,
                    }}>
                        {linkArea.title}
                    </a>
                ))}

        </div>
    );
});