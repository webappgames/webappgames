import { IVector2 } from '../../interfaces/IVectors';
import { CHARS } from './config';

export default class BuildingDataModel {

    //private _floorSizes: IVector2[];

    constructor(private _grid: string[][][]) {

        /*this._floorSizes =
        this._grid.map((floorGrid)=>{

            if(!(
                floorGrid.length>=3 && floorGrid.length%2===1
            )){
                throw new Error(`Size of floor must be odd number >=3 in every dimension.`);
                //todo check also whole grid
            }

            return {
                x: (floorGrid.length - 1) / 2,
                y: (floorGrid[0].length - 1) / 2
            };


        });*/


    }

    get floors():number{
        return this._grid.length;
    }

    getFloorSize(floorNumber: number):IVector2{
        return {
            y: (this._grid[floorNumber].length-1)/2,
            x: (this._grid[floorNumber][0].length-1)/2,
        };
    }

    getFloorPillars(floorNumber: number) {
        return this._getFloorSubgrid(floorNumber, 'PILLAR', {x: 0, y: 0});
    }


    getFloorWalls(floorNumber: number) {
        const horizontal = this._getFloorSubgrid(floorNumber, 'HORIZONTAL', {x: -1, y: 0});
        //const vertical = this._getFloorSubgrid(floorNumber, 'VERTICAL',{x: 0, y: -1});
        return {horizontal/*, vertical*/}
    }

    /*getFloorPlates(floorNumber: number) {
        return this._getFloorSubgrid(floorNumber, {x: 1, y: 1});
    }

    getFloorWalls(floorNumber: number) {
        const horizontal = this._getFloorSubgrid(floorNumber, {x: 1, y: 0});
        const vertical = this._getFloorSubgrid(floorNumber, {x: 0, y: 1});
        return {horizontal, vertical}
    }*/

    private _getFloorSubgrid(floorNumber: number, id:string, offset: IVector2): boolean[][] {

        const floorSize = this.getFloorSize(floorNumber);


        const subgridSize = {
            y: floorSize.y+offset.x,
            x: floorSize.x+offset.y
        };


        if(offset.x === 1 && offset.y ===1){
            subgridSize.y -= 1;
            subgridSize.x -= 1;
        }
        if(offset.x === -1){
            subgridSize.x = (floorSize.x*2)+1;
        }
        if(offset.y === -1){
            subgridSize.y = (floorSize.y*2)+1;
        }

        const subgrid: boolean[][] = [];
        for (let y = 0; y < subgridSize.y; y++) {
            subgrid[y] = [];
            for (let x = 0; x < subgridSize.x; x++) {
                //(x<floorSize.x)

                console.log(this._grid
                    [floorNumber]
                    [subgridSize.y===-1?y:y * 2 + offset.y]
                    [subgridSize.x===-1?x:x * 2 + offset.x]
                );
                subgrid[y][x] = id===this._grid
                    [floorNumber]
                    [subgridSize.y===-1?y:y * 2 + offset.y]
                    [subgridSize.x===-1?x:x * 2 + offset.x];
            }
        }
        return subgrid;
    }

    toString(): string {
        return this._grid
            .map((floorGrid)=>{

                let output = '';
                for (let y = 0; y < floorGrid.length; y++) {
                    for (let x = 0; x < floorGrid[y].length; x++) {

                        const charConfig = CHARS.find((charConfig)=>charConfig.id===floorGrid[y][x])||CHARS[0];
                        //console.log(charConfig,y,x);
                        output += charConfig.chars[y%2][x%2][0];

                    }
                    output += '\n';
                }
                return output;

            })
            .join('/n/n');
    }
}