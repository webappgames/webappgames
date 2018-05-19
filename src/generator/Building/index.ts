import * as GridBuilding from 'gridbuilding';
import AbstractMultiBrick from '../AbstractMultiBrick';
import World from '../../world/classes/World';
import Box from '../../world/classes/bricks/Box';
import * as BABYLON from 'babylonjs';

export default class Building extends AbstractMultiBrick {

    private _building: GridBuilding.Building;

    constructor(building: GridBuilding.Building,
                center: BABYLON.Vector3,
                world: World) {


        const boxes: Box[] = [];

        const moveBy = center;


        building.getBricks().forEach((brick) => {
            boxes.push(new Box(
                world,
                'stone-bricks',
                new BABYLON.Vector3(brick.size.x, brick.size.z, brick.size.y).add(moveBy),
                new BABYLON.Vector3(brick.center.x, brick.center.z, brick.center.y).add(moveBy)
            ));
        });


        super(...boxes);
        this._building = building;
    }

    toString(): string {
        return this._building.toString();
    }
}