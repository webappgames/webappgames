import {IVector2} from '../../interfaces/IVectors';

export default class Grid<T> {

    constructor(private _grid: T[][]) {
    }

    get array(){
        return this._grid;
    }

    get length(): IVector2 {
        return {
            x: this.lengthX,
            y: this.lengthY
        };
    }

    get lengthY(): number {
        return this._grid.length;
    }

    get lengthX(): number {
        return this._grid[0].length;//todo better
    }

    setCell(position: IVector2, value: T) {
        this._grid[position.y] = this._grid[position.y] || [];
        this._grid[position.y][position.x] = value;
    }

    getCell(position: IVector2): T | undefined {
        const row = this._grid[position.y] || [];
        return row[position.x];
    }

    iterate(callback: (value: T, position: IVector2) => void, rowCallback?: (y: number) => void) {
        for (let y = 0; y < this._grid.length; y++) {
            for (let x = 0; x < this._grid[y].length; x++) {
                callback(this._grid[y][x], {x, y});
            }
            if (typeof rowCallback !== 'undefined') rowCallback(y);
        }
    }

    filterSubgrid(filterCallback: (position: IVector2) => boolean, remapCallback: (position: IVector2) => IVector2): Grid<T> {
        const newGrid = new Grid<T>([]);
        this.iterate((value, position) => {
            if (filterCallback(position)) {
                newGrid.setCell(remapCallback(position), value);
            }
        });
        return newGrid;
    }


    /*getVerticalSubgrid(grid: (string | boolean)[][],offset:number) {
    }
    getHorizontalSubgrid(grid: (string | boolean)[][],offset:number) {
    }*/

    rotate(): Grid<T> {
        const rotatedGrid = new Grid<T>([]);
        this.iterate((value, position) => {
            rotatedGrid.setCell({x: position.y, y: position.x}, value);
        });
        return rotatedGrid;
    }

    getBooleanSubgrid(testValue: T): Grid<boolean> {
        const booleanGrid = new Grid<boolean>([]);
        this.iterate((value, position) => {
            booleanGrid.setCell({x: position.y, y: position.x}, value === testValue);
        });
        return booleanGrid;
    }

}