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
            const charConfig = CHARS.find((charConfig)=>charConfig.chars[y%2][x%2].indexOf(substring)!==-1);


            if(typeof charConfig === 'undefined'){
                throw new Error(`String "${substring} has no meaning in building ASCII config."`);
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
        //const floorGrid: boolean[][] = [];
        //grid.push(floorGrid);

        console.log(floorString);
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