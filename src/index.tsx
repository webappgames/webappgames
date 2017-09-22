import './index.css';
import * as BABYLON from 'babylonjs';
import createScene from './scene/create-scene';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './ui/components/Root';
import DataModel from './data-model';
//import registerServiceWorker from './registerServiceWorker';
//registerServiceWorker();

const canvasElement = document.getElementById("scene") as any;
const uiElement = document.getElementById("ui") as any;


const dataModel = new DataModel();


const engine = new BABYLON.Engine(canvasElement, true);
const scene = createScene(canvasElement, engine, dataModel);

engine.runRenderLoop(function () {
    scene.render();
});
window.addEventListener("resize", function () {
    engine.resize();
});




ReactDOM.render(
    <Root dataModel={dataModel}/>,
    uiElement
);

