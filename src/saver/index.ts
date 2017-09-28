import * as BABYLON from 'babylonjs';
import * as download from 'downloadjs';
import DataModel from '../data-model';

export default class WorldGenerator{
    constructor(
        private scene:BABYLON.Scene,
        private dataModel:DataModel
    ){}


    createXml(){

            this.scene;
            this.dataModel;

            return '<xml/>';
    }



    downloadXml(){
        download(this.createXml(), "WebAppGames.xml", "text/xml");
    }



}