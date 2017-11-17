import BuildingDataModel from './index';
import { CHARS } from './config';

function fromFroorString(floorString: string): string[][]{

    floorString = floorString.trim();

    const array: string[][] = [];
    let y=0;
    for(let rowString of floorString.split('\n')){

        array[y] = [];
        let x=0;

        for(let i=0;i<rowString.length;i+=x%2===0?3:1) {

            const substring = rowString.substring(i,i+(x%2===0?1:3));
            const charConfig = CHARS.find((charConfig)=>charConfig.chars.indexOf(substring)!==-1);


            if(typeof charConfig === 'undefined'){
                throw new Error(`String "${substring}" has no meaning in building ASCII config."`);
            }else{
                array[y][x] = charConfig.id;
            }

            x++;
        }

        y++;
    }

    return array;

}



export default function(buildingString:string[]):BuildingDataModel{

    const grid: string[][][] = [];
    for(const floorString of buildingString){


        grid.push(fromFroorString(floorString));


    }


    return new BuildingDataModel(grid);
}