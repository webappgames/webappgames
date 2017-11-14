import BuildingDataModel from '../BuildingDataModel';
import AbstractMultiBrick from '../AbstractMultiBrick';
import World from '../../world/classes/World';
import Box from '../../world/classes/bricks/Box';
import * as BABYLON from 'babylonjs';

interface IBuildingOptions{
    sizes: {
        cells: {
          width: number;
          height: number;
        };
        walls:{
            width: number;
            height: number;
        }
    }
}

export default class Building extends AbstractMultiBrick{

    private _building: BuildingDataModel;

    constructor(
        building: BuildingDataModel,
        center: BABYLON.Vector3,
        options: IBuildingOptions,
        world: World
    ){


        const boxes: Box[] = [];

        const floorSize = building.getFloorSize(0);
        console.log('floorSize',floorSize);
        const moveBy = center.add(new BABYLON.Vector3(
            options.sizes.cells.width * (floorSize.x),
            0,
            options.sizes.cells.width * (floorSize.y),
        ).scale(-.5));
        moveBy;


        //---------------------------Pillars
        building.getFloorPillars(0).iterate((val,pos)=>{
            if(val){
                boxes.push(new Box(
                    world,
                    'clay-bricks',
                    new BABYLON.Vector3(
                        options.sizes.walls.width,
                        options.sizes.cells.height,
                        options.sizes.walls.width
                    ),
                    new BABYLON.Vector3(
                        moveBy.x + pos.x * options.sizes.cells.width,
                        moveBy.y  + options.sizes.cells.height / 2,
                        -(moveBy.z  + pos.y * options.sizes.cells.width)
                    )
                ));
            }

        });
        //---------------------------

        //---------------------------Walls
        function wallPosition(x:number){
            let position = Math.floor(x/2) * (options.sizes.cells.width + options.sizes.walls.width);
            if(x%2===1){
                position += options.sizes.cells.width;
            }
            return position;
        }


        building.getFloorWalls(0).forEach(({from,to})=>{

            const fromX = wallPosition(from.x-1);
            const toX = wallPosition(to.x);
            console.log(fromX,toX);

            boxes.push(new Box(
                world,
                'clay-bricks',
                new BABYLON.Vector3(
                    toX-fromX,
                    options.sizes.cells.height,
                    options.sizes.walls.width
                ),
                new BABYLON.Vector3(
                    moveBy.x + (fromX+toX)/2,
                    moveBy.y +  options.sizes.walls.height / 2,
                    -(moveBy.z +  (from.y) * options.sizes.cells.width)
                ),
                new BABYLON.Vector3(
                    0,
                    0,
                    0
                )
            ));


        });
        //---------------------------


        //---------------------------Walls
        /*const {horizontal} = building.getFloorWalls(0);
        console.log('horizontal',horizontal);
        [{walls: horizontal, rotation: 0}].forEach(({walls, rotation}) => {

            for (let y = 0; y < walls.length; y++) {
                for (let x = 0; x < walls[y].length; x++) {


                    if (walls[y][x]) {
                        boxes.push(new Box(
                            world,
                            'clay-bricks',
                            new BABYLON.Vector3(
                                options.sizes.cells.width,// - options.wallThick,
                                options.sizes.cells.height,
                                options.sizes.walls.width
                            ),
                            new BABYLON.Vector3(
                                -moveBy.x - (x + Math.cos(rotation) * .5) * options.sizes.cells.width,
                                moveBy.y + options.sizes.walls.height / 2,
                                moveBy.z + (y + Math.sin(rotation) * .5) * options.sizes.cells.width
                            ),
                            new BABYLON.Vector3(
                                0,
                                rotation,
                                0
                            )
                        ));
                    }
                }
            }

        });*/
        //---------------------------


        //---------------------------Walls
        /*const {horizontal, vertical} = building.getFloorWalls(0);
        [{walls: horizontal, rotation: 0}, {walls: vertical, rotation: Math.PI / 2}].forEach(({walls, rotation}) => {

            for (let y = 0; y < walls.length; y++) {
                for (let x = 0; x < walls[y].length; x++) {


                    if (walls[y][x]) {
                        boxes.push(new Box(
                            world,
                            'clay-bricks',
                            new BABYLON.Vector3(
                                options.sizes.cells.width,// - options.wallThick,
                                options.sizes.cells.height,
                                options.sizes.walls.width
                            ),
                            new BABYLON.Vector3(
                                -moveBy.x - (x + Math.cos(rotation) * .5) * options.sizes.cells.width,
                                moveBy.y + options.sizes.walls.height / 2,
                                moveBy.z + (y + Math.sin(rotation) * .5) * options.sizes.cells.width
                            ),
                            new BABYLON.Vector3(
                                0,
                                rotation,
                                0
                            )
                        ));
                    }
                }
            }

        });*/
        //---------------------------


        //---------------------------Plates
        /*const plateSize = new BABYLON.Vector3(
            options.sizes.cells.width+options.sizes.walls.width,
            options.sizes.walls.height,
            options.sizes.cells.width+options.sizes.walls.width
        );

        const plates = building.getFloorPlates(0);
        for (let y = 0; y < plates.length; y++) {
            for (let x = 0; x < plates[y].length; x++) {
                if(plates[y][x]){
                    boxes.push(new Box(
                        world,
                        'clay-bricks',
                        plateSize,
                        new BABYLON.Vector3(
                            -moveBy.x - x * options.sizes.cells.width - plateSize.x/2,
                            moveBy.y  + options.sizes.cells.height + plateSize.y/2,
                            moveBy.z  + y * options.sizes.cells.width + plateSize.z/2
                        )
                    ));

                }
            }
        }*/
        //---------------------------


        super(...boxes);
        this._building = building;
    }

    toString():string{
            return this._building.toString();
    }
}