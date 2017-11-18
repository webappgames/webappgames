import Vector3 from './Vector3';

export default class Grid3<T> {

    constructor(private _grid: T[][][]) {
    }

    get array() {
        return this._grid;
    }

    get length(): Vector3 {
        return new Vector3(
            this.lengthX,
            this.lengthY,
            this.lengthZ
        );
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

    setCell(position: Vector3, value: T) {
        this._grid[position.z] = this._grid[position.z] || [];
        this._grid[position.z][position.y] = this._grid[position.z][position.y] || [];
        this._grid[position.z][position.y][position.x] = value;
    }

    /*getCell(position: IVector3): T | undefined {
        const grid2d = this._grid[position.z] || [];
        const grid1d = grid2d[position.y] || [];
        return grid1d[position.x];
    }*/

    iterate(callback: (value: T, position: Vector3) => void,
            rowCallback?: (y: number) => void,
            floorCallback?: (z: number) => void) {
        for (let z = 0; z < this._grid.length; z++) {
            for (let y = 0; y < this._grid[z].length; y++) {
                for (let x = 0; x < this._grid[z][y].length; x++) {
                    callback(this._grid[z][y][x], new Vector3(x, y, z));
                }
                if (typeof rowCallback !== 'undefined') rowCallback(y);
            }
            if (typeof floorCallback !== 'undefined') floorCallback(z);
        }
    }

    getBooleanGrid(testValue: T): Grid3<boolean> {
        const booleanGrid = new Grid3<boolean>([]);
        this.iterate((val, pos) => {
            booleanGrid.setCell(pos, val === testValue);
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