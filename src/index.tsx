import World from './world/classes/World';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './ui/components/Root';
import UIDataModel from './ui/UIDataModel';
import Saver from './saver';
//import registerServiceWorker from './registerServiceWorker';
//registerServiceWorker();
const canvasElement = document.getElementById("scene") as any;
const uiElement = document.getElementById("ui") as any;

const uiDataModel = new UIDataModel();

const world = new World(canvasElement, uiDataModel);
const saver = new Saver(world, uiDataModel);

console.log(world);

ReactDOM.render(
    <Root uiDataModel={uiDataModel} saver={saver}/>,
    uiElement
);

