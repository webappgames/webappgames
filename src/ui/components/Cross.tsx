import * as React from 'react';
import {observer} from 'mobx-react';
import UIDataModel from '../data-model';
//import {formatNumber} from '../../tools/number';
import './style/Cross.css';



export default observer(({uiDataModel}:{uiDataModel:UIDataModel})=> {
    return (
        <div id="cross" >
            <img src={process.env.PUBLIC_URL +`/assets/ui/cross${/*uiDataModel.aimStatus*/'-aimed'}.png`}/>

            {/*{uiDataModel.aimed ?
                <div>
                    <div className="cost">
                        {formatNumber(uiDataModel.aimedEnergyCost, 'ε')}
                    </div>
                    {uiDataModel.aimedMessage?
                    <div className="message">
                        {uiDataModel.aimedMessage}
                    </div>:undefined}
                </div>
            :undefined}*/}
        </div>
    );
});