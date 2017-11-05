import * as React from 'react';
import {observer} from 'mobx-react';
import UIDataModel from '../data-model';
import './style/Stat.css';

export default observer(({uiDataModel}:{uiDataModel:UIDataModel})=>{
    return (
        <div id="stat">
            <table>
                <tbody>
                    <tr>
                        <th>FPS</th>
                        <td>{uiDataModel.stat.fps.toFixed(0)}</td>
                    </tr>
                    <tr>
                        <th>Meshes</th>
                        <td>{uiDataModel.stat.meshes.toString()}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
});