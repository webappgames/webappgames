import World from './scene/classes/World';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './ui/components/Root';
import DataModel from './data-model';
import Saver from './saver';
//import registerServiceWorker from './registerServiceWorker';
//registerServiceWorker();
const canvasElement = document.getElementById("scene") as any;
const uiElement = document.getElementById("ui") as any;

const dataModel = new DataModel();

const world = new World(canvasElement, dataModel);
const saver = new Saver(world,dataModel);

ReactDOM.render(
    <Root dataModel={dataModel} saver={saver}/>,
    uiElement
);

