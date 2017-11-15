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

        function wallPosition(x:number){
            let position = Math.floor(x/2) * (options.sizes.cells.width + options.sizes.walls.width);
            if(x%2===1){
                position += options.sizes.walls.width;
            }
            return position;
        }

        //---------------------------Walls
        building.getFloorWalls(0).forEach((wall)=>{

            const from = {
                x: wallPosition(wall.from.x),
                y: wallPosition(wall.from.y),
            };

            const to = {
                x: wallPosition(wall.to.x+1),
                y: wallPosition(wall.to.y+1),
            };


            boxes.push(new Box(
                world,
                'clay-bricks',
                new BABYLON.Vector3(
                    to.x-from.x,
                    options.sizes.cells.height,
                    to.y-from.y//options.sizes.walls.width
                ),
                new BABYLON.Vector3(
                    moveBy.x + (from.x+to.x)/2,
                    moveBy.y +  options.sizes.cells.height / 2,
                    -(moveBy.z +  (from.y+to.y)/2)
                )
            ));


        });
        //---------------------------



        //---------------------------Walls
        building.getFloorPlates(0).forEach((wall)=>{

            const from = {
                x: (wallPosition(wall.from.x)+wallPosition(wall.from.x-1))/2,
                y: (wallPosition(wall.from.y)+wallPosition(wall.from.y-1))/2
            };

            const to = {
                x: (wallPosition(wall.to.x+1)+wallPosition(wall.to.x+2))/2,
                y: (wallPosition(wall.to.y+1)+wallPosition(wall.to.y+2))/2
            };

            boxes.push(new Box(
                world,
                'clay-bricks',
                new BABYLON.Vector3(
                    to.x-from.x,
                    options.sizes.walls.height,
                    to.y-from.y
                ),
                new BABYLON.Vector3(
                    moveBy.x + (from.x+to.x)/2,
                    moveBy.y +  options.sizes.cells.height + options.sizes.walls.height / 2,
                    -(moveBy.z +  (from.y+to.y)/2)
                )
            ));


        });
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