export default class BuildingDataModel{

    constructor(private _grid: boolean[][][]){
    }

    /*
     getPlates(){
     }

     /*getPillars(){
     }*/


    getWalls(floorNumber: number){

        const floor = this._grid[floorNumber];

        const horizontal:boolean[][] = [];
        const vertical:boolean[][] = [];



        for(let y = 0; y < floor.length/2-1; y++) {
            horizontal[y] = [];
            vertical[y] = [];
            for (let x = 0; x < floor[y].length/2-1; x++) {


                horizontal[y][x] = floor[y*2+0][x*2+1];
                vertical[y][x] = floor[y*2+1][x*2+0];


            }
        }


        /*//todo DRY
        for(let y = 0; y < floor.length/2+1; y++) {
            horizontal[y] = [];
            for (let x = 0; x < floor[y].length/2; x++) {
                horizontal[y][x] = floor[y*2+0][x*2+1];
            }
        }

        for(let y = 0; y < floor.length/2; y++) {
            vertical[y] = [];
            for (let x = 0; x < floor[y].length/2+1; x++) {
                vertical[y][x] = floor[y*2+1][x*2+0];
            }
        }*/

        return {horizontal,vertical}

    }



    toString():string{
        return this._grid
            .map((floorGrid)=>BuildingDataModel.gridToString(floorGrid))
            .join('/n/n');
    }


    static gridToString(grid:boolean[][]):string {
        let output = '';
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                output+=grid[y][x]?'██':'  ';
            }
            output+='\n';
        }
        return output;
    }

}