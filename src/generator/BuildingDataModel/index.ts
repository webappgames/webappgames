import {IVector2} from '../../interfaces/IVectors';
import {CHARS} from './config';
import Grid from './Grid';
import {isNull} from "util";

interface IWall {
    from: IVector2;
    to: IVector2;
}

export default class BuildingDataModel {

    private _grids: Grid<string>[]

    constructor(grid3D: string[][][]) {
        this._grids = grid3D.map((grid2D) => new Grid(grid2D));
    }

    get floors(): number {
        return this._grids.length;
    }

    getFloorSize(floorNumber: number): IVector2 {

        const length = this._grids[floorNumber].length;
        return {
            x: (length.x - 1) / 2,
            y: (length.y - 1) / 2
        }
    }

    /*getFloorPillars(floorNumber: number) {
        return (
            this._grids[floorNumber]
                .filterSubgrid(
                    (position) => position.x % 2 === 0 && position.y % 2 === 0,
                    (position) => ({x: position.x / 2, y: position.y / 2})
                )
                .getBooleanSubgrid('PILLAR')
        );


    }*/


    getFloorWalls(floorNumber: number) {

        const walls: IWall[] = [];

        ['HORIZONTAL','VERTICAL', 'PILLAR'].forEach((cellType) => {


            const verticalWalls =
                this._grids[floorNumber]
                /*.filterSubgrid(
                    (position) => position.y % 2===0,
                    (position) => ({x: position.x, y: position.y/2})
                )*/
                    .getBooleanSubgrid(cellType);

            console.log(verticalWalls);
            console.log(this.toString());
            console.log(verticalWalls.toString());


            let newWall: null | IWall = null;
            const commitNewWall = () => {
                if (!isNull(newWall)) {
                    walls.push(newWall);
                    newWall = null;
                }
            };

            verticalWalls.iterate((val, pos) => {

                if (val) {
                    if (isNull(newWall)) {
                        newWall = {from: pos, to: pos};
                    } else {
                        newWall = {from: newWall.from, to: pos};
                    }

                } else {
                    commitNewWall();
                }

            }, commitNewWall);


        });

        //console.log(walls);

        return (
            walls
        );
    }


    /*getFloorWalls(floorNumber: number) {
        const horizontal = this._getFloorSubgrid(floorNumber, 'HORIZONTAL', {x: -1, y: 0});
        //const vertical = this._getFloorSubgrid(floorNumber, 'VERTICAL',{x: 0, y: -1});
        return {horizontal/*, vertical* /}
    }

    /*getFloorPlates(floorNumber: number) {
        return this._getFloorSubgrid(floorNumber, {x: 1, y: 1});
    }

    getFloorWalls(floorNumber: number) {
        const horizontal = this._getFloorSubgrid(floorNumber, {x: 1, y: 0});
        const vertical = this._getFloorSubgrid(floorNumber, {x: 0, y: 1});
        return {horizontal, vertical}
    }*/


    /*private _getFloorSubgrid(floorNumber: number, id: string, offset: IVector2): boolean[][] {


        const floorSize = this.getFloorSize(floorNumber);


        const subgridSize = {
            y: floorSize.y + offset.x,
            x: floorSize.x + offset.y
        };


        if (offset.x === 1 && offset.y === 1) {
            subgridSize.y -= 1;
            subgridSize.x -= 1;
        }
        if (offset.x === -1) {
            subgridSize.x = (floorSize.x * 2) + 1;
        }
        if (offset.y === -1) {
            subgridSize.y = (floorSize.y * 2) + 1;
        }

        const subgrid: boolean[][] = [];
        for (let y = 0; y < subgridSize.y; y++) {
            subgrid[y] = [];
            for (let x = 0; x < subgridSize.x; x++) {
                //(x<floorSize.x)

                console.log(this._grids
                    [floorNumber]
                    [subgridSize.y === -1 ? y : y * 2 + offset.y]
                    [subgridSize.x === -1 ? x : x * 2 + offset.x]
                );
                subgrid[y][x] = id === this._grids
                    [floorNumber]
                    [subgridSize.y === -1 ? y : y * 2 + offset.y]
                    [subgridSize.x === -1 ? x : x * 2 + offset.x];
            }
        }
        return subgrid;
    }*/

    toString(): string {
        return this._grids
            .map((floorGrid) => {

                let output = '';


                floorGrid.iterate((val, pos) => {


                    const charConfig = CHARS.find((charConfig) => charConfig.id === val) || CHARS[0];
                    //console.log(charConfig,y,x);
                    output += charConfig.chars[pos.y % 2][pos.x % 2][0];
                }, () => {
                    output += '\n';
                });


                /*for (let y = 0; y < floorGrid.lengthY; y++) {
                    for (let x = 0; x < floorGrid.lengthX; x++) {

                        const charConfig = CHARS.find((charConfig) => charConfig.id === floorGrid[y][x]) || CHARS[0];
                        //console.log(charConfig,y,x);
                        output += charConfig.chars[y % 2][x % 2][0];

                    }
                    output += '\n';
                }*/
                return output;

            })
            .join('/n/n');
    }
}