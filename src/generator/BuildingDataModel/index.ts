import { IVector2 } from '../../interfaces/IVectors';

export default class BuildingDataModel {

    private _floorSizes: IVector2[];

    constructor(private _grid: boolean[][][]) {

        this._floorSizes =
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


        });



    }


    getSubgrid(floorNumber: number, offset: IVector2): boolean[][] {
        const subgrid: boolean[][] = [];
        for (let y = 0; y < this._floorSizes[floorNumber].y; y++) {
            subgrid[y] = [];
            for (let x = 0; x < this._floorSizes[floorNumber].x; x++) {
                subgrid[y][x] = this._grid
                    [floorNumber]
                    [y * 2 + offset.y]
                    [x * 2 + offset.x];
            }
        }
        return subgrid;
    }

    getPillars(floorNumber: number) {
        return this.getSubgrid(floorNumber, {x: 0, y: 0});
    }

    getPlates(floorNumber: number) {
        this.getSubgrid(floorNumber, {x: 1, y: 1});
    }

    getWalls(floorNumber: number) {
        const horizontal = this.getSubgrid(floorNumber, {x: 1, y: 0});
        const vertical = this.getSubgrid(floorNumber, {x: 0, y: 1});
        return {horizontal, vertical}
    }

    toString(): string {

        const CHARS = {
            full: [
                ['+','---'],
                ['|','   ']
            ],
            none: [
                [' ','   '],
                [' ','   ']
            ],
        };

        return this._grid
            .map((floorGrid)=>{

                let output = '';
                for (let y = 0; y < floorGrid.length; y++) {
                    for (let x = 0; x < floorGrid[y].length; x++) {
                        output += floorGrid[y][x] ? CHARS.full[y%2][x%2] : CHARS.none[y%2][x%2];
                    }
                    output += '\n';
                }
                return output;

            })
            .join('/n/n');
    }

}