import BuildingDataModel from './index';
import { CHARS } from './config';

function fromFroorString(floorString: string): boolean[][]{

    floorString = floorString.trim();

    const array: boolean[][] = [];
    let y=0;
    for(let rowString of floorString.split('\n')){

        array[y] = [];
        let x=0;

        for(let i=0;i<rowString.length;i+=x%2===0?3:1) {

            const substring = rowString.substring(i,i+(x%2===0?1:3));

            if(CHARS.full[y%2][x%2]===substring){
                array[y][x] = true;

            }else{
                array[y][x] = false;
            }

            x++;
        }

        y++;
    }

    return array;

}



export default function(buildingString:string[]):BuildingDataModel{

    const grid: boolean[][][] = [];
    for(const floorString of buildingString){
        //const floorGrid: boolean[][] = [];
        //grid.push(floorGrid);

        //console.log(floorString);
        grid.push(fromFroorString(floorString));
        //console.log('floorArray',floorGrid);

        /*for(let y=0;y<floorArray.length;y++){
            floorGrid[y] = [];
            for(let x=0;x<floorArray[y].length;x++){



                switch(floorArray[y][x]){


                    case '+':
                    case '-':
                    case '|':
                        floorGrid[y][x] = true;
                        break;
                    default:
                        floorGrid[y][x] = false
                        break;
                }


            }
        }*/


    }


    return new BuildingDataModel(grid);
}