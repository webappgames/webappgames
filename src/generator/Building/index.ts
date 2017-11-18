import * as GridBuilding from '../../gridbuilding';
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
                BABYLON.Vector3.FromArray(brick.size.toArray()).add(moveBy),
                BABYLON.Vector3.FromArray(brick.position.toArray()).add(moveBy)
            ));
        });


        super(...boxes);
        this._building = building;
    }

    toString(): string {
        return this._building.toString();
    }
}