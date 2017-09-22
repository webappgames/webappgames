import * as React from 'react';
import {observer} from 'mobx-react';
import DataModel from '../../data-model';
import './style/Cross.css';



export default observer(({dataModel}:{dataModel:DataModel})=> {
    return (
        <div id="cross" >
            <img src={`/assets/ui/cross${dataModel.aimed?'-aimed':''}.png`}/>
        </div>
    );
});