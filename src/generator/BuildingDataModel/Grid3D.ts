import {IVector3} from '../../interfaces/IVectors';

export default class Grid3D<T> {

    constructor(private _grid: T[][][]) {
    }

    get array() {
        return this._grid;
    }

    get length(): IVector3 {
        return {
            x: this.lengthX,
            y: this.lengthY,
            z: this.lengthZ
        };
    }

    get lengthY(): number {
        return this._grid.length;
    }

    get lengthX(): number {
        return this._grid[0].length;//todo better
    }

    get lengthZ(): number {
        return this._grid[0][0].length;//todo better
    }

    setCell(position: IVector3, value: T) {
        this._grid[position.z] = this._grid[position.z] || [];
        this._grid[position.z][position.y] = this._grid[position.z][position.y] || [];
        this._grid[position.z][position.y][position.x] = value;
    }

    /*getCell(position: IVector3): T | undefined {
        const grid2d = this._grid[position.z] || [];
        const grid1d = grid2d[position.y] || [];
        return grid1d[position.x];
    }*/

    iterate(callback: (value: T, position: IVector3) => void,
            rowCallback?: (y: number) => void,
            floorCallback?: (z: number) => void) {
        for (let z = 0; z < this._grid.length; z++) {
            for (let y = 0; y < this._grid[z].length; y++) {
                console.log(this._grid[z][y]);
                for (let x = 0; x < this._grid[z][y].length; x++) {
                    callback(this._grid[z][y][x], {x, y, z});
                }
                if (typeof rowCallback !== 'undefined') rowCallback(y);
            }
            if (typeof floorCallback !== 'undefined') floorCallback(z);
        }
    }

    /*filterSubgrid(filterCallback: (position: IVector2) => boolean, remapCallback: (position: IVector2) => IVector2): Grid<T> {
        const newGrid = new Grid<T>([]);
        this.iterate((value, position) => {
            if (filterCallback(position)) {
                newGrid.setCell(remapCallback(position), value);
            }
        });
        return newGrid;
    }*/

    /*rotate(): Grid<T> {
        const rotatedGrid = new Grid<T>([]);
        this.iterate((value, position) => {
            rotatedGrid.setCell({x: position.y, y: position.x}, value);
        });
        return rotatedGrid;
    }*/

    getBooleanGrid(testValue: T): Grid3D<boolean> {
        const booleanGrid = new Grid3D<boolean>([]);
        this.iterate((value, position) => {
            booleanGrid.setCell({x: position.x, y: position.y, z: position.z}, value === testValue);
        });
        return booleanGrid;
    }

    toString(): string {
        let output = '';
        this.iterate((val, pos) => {
            output += val ? '██' : '  ';
        }, () => {
            output += '\n';
        }, () => {
            output += '\n\n\n';
        });
        return output;
    }

}