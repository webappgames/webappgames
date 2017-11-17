import BuildingDataModel from '../BuildingDataModel';
import AbstractMultiBrick from '../AbstractMultiBrick';
import World from '../../world/classes/World';
import Box from '../../world/classes/bricks/Box';
import * as BABYLON from 'babylonjs';

interface IBuildingOptions {
    sizes: {
        cells: {
            width: number;
            height: number;
        };
        walls: {
            width: number;
            height: number;
        }
    }
}

export default class Building extends AbstractMultiBrick {

    private _building: BuildingDataModel;

    constructor(building: BuildingDataModel,
                center: BABYLON.Vector3,
                options: IBuildingOptions,
                world: World) {


        const boxes: Box[] = [];

        function wallPosition(x: number) {
            let position = Math.floor(x / 2) * (options.sizes.cells.width + options.sizes.walls.width);
            if (x % 2 === 1) {
                position += options.sizes.walls.width;
            }
            return position;
        }




        /*const moveBy = center.add(new BABYLON.Vector3(
            options.sizes.cells.width * (floorSize.x) * -.5,
            0,
            options.sizes.cells.width * (floorSize.y) * -.5,
        ));*/

        const moveBy = center;



        //---------------------------Walls
        building.getWalls().forEach((wall) => {

            const from = {
                x: wallPosition(wall.from.x),
                y: wallPosition(wall.from.y),
                z: wallPosition(wall.from.z),
            };

            const to = {
                x: wallPosition(wall.to.x + 1),
                y: wallPosition(wall.to.y + 1),
                z: wallPosition(wall.to.z + 1),
            };


            boxes.push(new Box(
                world,
                'stone-bricks',
                new BABYLON.Vector3(
                    to.x - from.x,
                    to.z - from.z,
                    to.y - from.y//options.sizes.walls.width
                ),
                //todo moveBy add
                new BABYLON.Vector3(
                    moveBy.x + (from.x + to.x) / 2,
                    moveBy.z + (from.z + to.z) / 2,
                    -(moveBy.z + (from.y + to.y) / 2)
                )
            ));


        });
        //---------------------------



        super(...boxes);
        this._building = building;
    }

    toString(): string {
        return this._building.toString();
    }
}