import * as React from 'react';
import {observer} from 'mobx-react';
import DataModel from '../../data-model';
//import {formatNumber} from '../../tools/number';
import './style/Cross.css';



export default observer(({dataModel}:{dataModel:DataModel})=> {
    return (
        <div id="cross" >
            <img src={`/assets/ui/cross${/*dataModel.aimStatus*/'-aimed'}.png`}/>

            {/*{dataModel.aimed ?
                <div>
                    <div className="cost">
                        {formatNumber(dataModel.aimedEnergyCost, 'ε')}
                    </div>
                    {dataModel.aimedMessage?
                    <div className="message">
                        {dataModel.aimedMessage}
                    </div>:undefined}
                </div>
            :undefined}*/}
        </div>
    );
});