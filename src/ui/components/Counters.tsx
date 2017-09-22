import * as React from 'react';
import {observer} from 'mobx-react';
import DataModel from '../../data-model';
import './style/Counters.css';

function floatToPercentString(floatValue:number):string{
    return Math.round(floatValue*100).toString()+'%';
}

export default observer(({dataModel}:{dataModel:DataModel})=> {
    return (
        <div id="counters">
            <div className="health">
                {floatToPercentString(dataModel.health)}
            </div>
            <div className="energy">
                {floatToPercentString(dataModel.energy)}
                {/*10&nbsp;000Mwh*/}
            </div>
        </div>
    );
});