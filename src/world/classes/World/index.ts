//import log from '../tools/log';
import IPickingInfo from '../../../interfaces/IPickingInfo';
import * as BABYLON from 'babylonjs';
import UIDataModel from '../../../ui/UIDataModel';
import MaterialFactory from "./../../classes/MaterialFactory";
import WorldGenerator from "../../../generator";
import SoundFactory from '../SoundFactory';
import Player from '../Player';
import AbstractBrick from '../bricks/AbstractBrick';
import Ground from '../bricks/Ground';
import Sphere from '../bricks/Sphere';
import createParticles from '../../tools/create-particles';
import createScene from './createScene';
import createLights from './createLights';
import createGroundBrick from './createGroundBrick';
import createSkyboxMesh from './createSkyboxMesh';
import * as _ from "lodash";


export default class World{

    public engine:BABYLON.Engine;
    public scene:BABYLON.Scene;
    //public webVR: boolean;//todo mode instead of this
    public materialFactory:MaterialFactory;
    public soundFactory:SoundFactory;
    public worldGenerator:WorldGenerator;
    public lights:BABYLON.Light[];
    public player:Player;
    public bricks:AbstractBrick[];
    public groundBrick:Ground;
    public skyboxMesh:BABYLON.AbstractMesh;


    constructor(
        public canvasElement: HTMLCanvasElement,
        public uiDataModel:UIDataModel
    ) {
        //this.webVR = !(window.location.pathname === '/novr' || window.location.hash === '#novr');//todo DI
        this.createScene(true);
    }


    createScene(runWorldGenerator=false){
        this.bricks=[];

        this.engine = new BABYLON.Engine(this.canvasElement, true);

        const updateFps = _.throttle(()=>{
            this.uiDataModel.stat.fps = this.engine.getFps();
            this.uiDataModel.stat.meshes = this.scene.meshes.length;
        },200);

        this.engine.runRenderLoop(()=>{
            this.scene.render();
            updateFps();
        });

        window.addEventListener("resize", ()=>{
            this.engine.resize();
        });


        this.scene = createScene(this.engine);
        this.lights = createLights(this.scene);
        this.soundFactory = new SoundFactory(this.scene);
        this.materialFactory = new MaterialFactory(this.soundFactory,this.scene);
        this.player = new Player(this);
        this.skyboxMesh = createSkyboxMesh(this.scene);
        this.groundBrick = createGroundBrick(this);

        console.log(this.bricks);



        if(runWorldGenerator){
            this.worldGenerator = new WorldGenerator(this);
            this.worldGenerator.generateWorld();
        }



        this.scene.onDispose = ()=>{

            const old_element = this.canvasElement;
            const new_element = old_element.cloneNode(true);
            (old_element.parentNode as any).replaceChild(new_element, old_element);
            this.canvasElement = new_element as HTMLCanvasElement;

        };

        //--------------------------------------------------------------todo Refactor below

        //----------disasters
        /*setInterval(()=>{
         if(Math.random()>0.99){
         this.randomDisaster()
         }
         },100);/**/
        //----------


        /*BABYLON.SceneOptimizer.OptimizeAsync(this.scene, BABYLON.SceneOptimizerOptions.ModerateDegradationAllowed(),
         function() {
         // On success
         }, function() {
         // FPS target not reached
         })*/

    }

    findBrickByMesh(mesh:BABYLON.AbstractMesh):AbstractBrick|null{
        const brick = this.bricks.find((brick)=>brick.mesh===mesh)||null;
        return brick;
    }


    /*pick(left:number=.5,top:number=.5):IPickingInfo{
        return this.convertPickingInfo(
            this.scene.pick(this.canvasElement.width*left, this.canvasElement.height*top, (mesh)=>{
                return 'physicsImpostor' in mesh;
            })!
        );
    }*/

    convertPickingInfo(babylonPickingInfo: BABYLON.PickingInfo, handPosition: BABYLON.Vector3):IPickingInfo{
        return(
            {
                handPosition,
                pickedPoint: babylonPickingInfo.pickedPoint!,
                pickedBrick: this.findBrickByMesh(babylonPickingInfo.pickedMesh!)
            }
        );
    }

    /*
    pickFromCenter():BABYLON.PickingInfo{
        return this.scene.pick(this.canvasElement.width / 2, this.canvasElement.height / 2, (mesh)=>{
            return mesh !== this.player.mesh  && 'physicsImpostor' in mesh;
        });
    }

    get meshes():BABYLON.AbstractMesh[]{

        return this.scene.meshes.filter((mesh)=>(
            mesh!==this.player.mesh&&
            mesh!==this.groundMesh&&
            mesh!==this.skyboxMesh&&
            mesh.material instanceof BABYLON.StandardMaterial &&
            mesh.physicsImpostor instanceof BABYLON.PhysicsImpostor
        ));
    }*/

    cleanScene(){

        (this.scene.activeCamera as BABYLON.FreeCamera).rotation.y = 0;
        this.engine.dispose();
        this.createScene();
    }

    randomBrick():AbstractBrick{
        const allBricks = this.bricks;
        return allBricks[Math.floor(Math.random()*allBricks.length)];
    }


    //-------------------------------environment disasters

    randomDisaster(){
        this.setMeteoriteTarget(this.randomBrick());
    }

    //todo create class Disaster, or move to worldGenerator - move to separate file
    setMeteoriteTarget(target:BABYLON.Vector3|AbstractBrick){


        let targetPoint: BABYLON.Vector3;
        if(target instanceof BABYLON.Vector3){
            targetPoint = target;
        }else
        if(target instanceof AbstractBrick){
            targetPoint = target.mesh.position;
        }else{
            return;
        }


        const awayRotation = Math.random()*Math.PI*2;

        const away = new BABYLON.Vector3(
            Math.cos(awayRotation)*100,
            Math.random()*100,
            Math.sin(awayRotation)*100
        );


        const meteorite = new Sphere(
            this,
            'Meteorite',
            new BABYLON.Vector3(4,4,4),
            away,
            BABYLON.Vector3.Zero(),
            away.scale(-2).add(new BABYLON.Vector3(0,30,0)),
            new BABYLON.Vector3(
                Math.random()*Math.PI*2*7,
                Math.random()*Math.PI*2*7,
                Math.random()*Math.PI*2*7
            )
        );


        const particles = createParticles(
            meteorite.mesh,
            {
                color1: '#ff0000',
                color2: '#ffd32d',
                minSize:1,
                maxSize:5,
                minLifeTime: 1,
                maxLifeTime: 3
            },
            this.scene
        );



        setTimeout(()=> {

            particles.stop();

            setTimeout(() => {
                particles.dispose();
                meteorite.dispose();
            }, 500);

        },2000);



    }







}

