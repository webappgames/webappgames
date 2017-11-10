import * as React from 'react';
import {observer} from 'mobx-react';
import UIDataModel from '../UIDataModel';
import {floatToPercentString,formatNumber} from '../../tools/number';
import './style/Counters.css';



export default observer(({uiDataModel}:{uiDataModel:UIDataModel})=> {
    return (
        <div id="counters">
            <div className="health">
                {floatToPercentString(uiDataModel.health,'ζ')}
            </div>
            <div className="energy">
                {formatNumber(uiDataModel.energy,'ε')}
                {/*10&nbsp;000Mwh*/}
            </div>
        </div>
    );
});