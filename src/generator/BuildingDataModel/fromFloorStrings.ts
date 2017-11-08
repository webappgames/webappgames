import BuildingDataModel from './index';

function splitFloor(floorString: string): string[][]{

    floorString = floorString.trim();

    const array: string[][] = [];
    let y=0;
    for(let rowString of floorString.split('\n')){

        array[y] = [];
        let x=0;

        for(let i=0;i<rowString.length;i++){

            if(array[y][x-1]!==rowString[i]){
                array[y][x] = rowString[i];
                x++;
            }

        }




        y++;
    }

    return array;

}



export default function(buildingString:string[]):BuildingDataModel{

    for(const floorString of buildingString){

        console.log(floorString);
        const floorArray = splitFloor(floorString);
        console.log(floorArray);

        for(let y=0;y<floorArray.length;y++){
            for(let x=0;x<floorArray[y].length;x++){



                switch(floorArray[y][x]){


                    case '+':
                    case '-':
                    case '|':
                        break;

                }


            }
        }








    }


    return new BuildingDataModel([[[]]]);
}