import './index.css';
import * as BABYLON from 'babylonjs';
import createScene from './scene/create-scene';
import registerServiceWorker from './registerServiceWorker';
registerServiceWorker();

const canvasElement = document.getElementById("scene") as any;


canvasElement.onclick = function() {
    canvasElement.requestPointerLock();
    //document.requestFullscreen();
}

const engine = new BABYLON.Engine(canvasElement, true);
const scene = createScene(canvasElement, engine);

engine.runRenderLoop(function () {
    scene.render();
});
window.addEventListener("resize", function () {
    engine.resize();
});