import * as React from 'react';
import {observer} from 'mobx-react';
import DataModel from '../../data-model';
import {floatToPercentString,formatNumber} from '../../tools/number';
import './style/Counters.css';



export default observer(({dataModel}:{dataModel:DataModel})=> {
    return (
        <div id="counters">
            <div className="health">
                {floatToPercentString(dataModel.health,'ζ')}
            </div>
            <div className="energy">
                {formatNumber(dataModel.energy,'ε')}
                {/*10&nbsp;000Mwh*/}
            </div>
        </div>
    );
});