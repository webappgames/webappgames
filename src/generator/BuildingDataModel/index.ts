import { IVector3 } from '../../interfaces/IVectors';

export default class BuildingDataModel{

    private _size: IVector3;

    constructor(private _grid: boolean[][][]){

        this._size = {
            x: (_grid.length-1)/2,
            y: (_grid[0].length-1)/2,
            z: (_grid[0][0].length-1)/2
        }

        if(!(
            !isNaN(this._size.x) && this._size.x>0 && this._size.x===Math.floor( this._size.x ) &&
            !isNaN(this._size.y) && this._size.y>0 && this._size.y===Math.floor( this._size.y ) &&
            !isNaN(this._size.z) && this._size.z>0 && this._size.z===Math.floor( this._size.z ) &&
        )){
            throw new Error(`Size of grid must be odd number >=3 in every dimension. Current size is ${JSON.stringify(this._size)}.`);
        }

        //todo maybe check also whole grid

    }


    getSubgrid(offset:IVector3): boolean[][][]{

        const subgrid: boolean[][][] = [];

        for(let z=0;z<this._size.z;z++){
            subgrid[z] = [];
            for(let y=0;y<this._size.y;y++){
                subgrid[z][y] = [];
                for(let x=0;x<this._size.x;x++){

                    subgrid[z][y][x] = false;


                }
            }
        }

        return subgrid;
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



        for(let y = 0; y < floor.length/2; y++) {
            horizontal[y] = [];
            vertical[y] = [];
            for (let x = 0; x < floor[0].length/2; x++) {


                if(floor[0].length>x*2+1){
                    horizontal[y][x] = floor[y*2+0][x*2+1];
                }
                if(floor.length>y*2+1){
                    vertical[y][x] = floor[y*2+1][x*2+0];
                }



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