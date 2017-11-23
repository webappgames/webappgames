import Vector2 from '../Vector2';
import BuildingDataModel from './index';
import {CHARS} from './config';

function createPlateString(floorString: string) {
    let deskString = '';
    for (let i = 0; i < floorString.length; i++) {
        if (floorString[i] === ' ') {
            deskString += floorString[i];
        } else if (floorString[i] === '\n') {
            deskString += floorString[i];
        } else {
            deskString += '#';
        }
    }
    return deskString;
}

function fromFroorString(floorString: string): string[][] {

    floorString = floorString.trim();

    const array: string[][] = [];
    let y = 0;
    for (let rowString of floorString.split('\n')) {

        array[y] = [];
        let x = 0;

        for (let i = 0; i < rowString.length; i += x % 2 === 0 ? 3 : 1) {

            const substring = rowString.substring(i, i + (x % 2 === 0 ? 1 : 3));
            const charConfig = CHARS.find((charConfig) => charConfig.chars.indexOf(substring) !== -1);


            if (typeof charConfig === 'undefined') {
                throw new Error(`String "${substring}" has no meaning in building ASCII config."`);
            } else {
                array[y][x] = charConfig.id;
            }

            x++;
        }

        y++;
    }

    return array;

}

export default function (buildingString: string[]): BuildingDataModel {

    const grid: string[][][] = [];

    buildingString.forEach((floorString, i) => {
        const plate = fromFroorString(createPlateString(floorString));
        //if(i===0)grid.push(plate);
        grid.push(fromFroorString(floorString));
        grid.push(plate);
    });

    return new BuildingDataModel(
        grid,
        {
            x: [3, 10],
            y: [3, 10],
            z: [10, 0.5],//[0.5, 10],
        },
        new Vector2(5, 5)
    );
}