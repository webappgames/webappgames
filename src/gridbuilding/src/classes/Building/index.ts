import {CHARS} from './config';
import Vector3 from '../Vector3';
import Grid3 from '../Grid3';
import Wall from '../Grid3Brick';
import Brick from '../Brick';

interface IGridSize {
    x: number[],
    y: number[],
    z: number[]
}

export default class Building extends Grid3<string> {

    constructor(grid: string[][][],
                public size: IGridSize) {
        super(grid);
    }


    getWalls(): Wall[] {

        let wallsMixed: Wall[] = [];

        CHARS
            .filter((charConfig) => charConfig.id !== 'NONE')
            .forEach((charConfig) => {
                const walls: Wall[] = [];
                this.getBooleanGrid(charConfig.id).iterate((val, pos) => {
                    if (val) {
                        walls.push(new Wall(pos, pos));
                    }
                });
                const joinedWalls = Wall.joinWalls(walls);
                wallsMixed = wallsMixed.concat(joinedWalls);
            });

        return wallsMixed;
    }

    positionOnGrid(axis: string, gridCellPosition: number) {
        let position = Math.floor(gridCellPosition / 2) * (this.size[axis][0] + this.size[axis][1]);
        if (gridCellPosition % 2 === 1) {
            position += this.size[axis][0];
        }
        return position;
    }

    getBricks(): Brick[] {


        const bricks: Brick[] = [];


        this.getWalls().forEach((wall) => {
            bricks.push(new Brick(
                new Vector3(
                    this.positionOnGrid('x', wall.from.x),
                    this.positionOnGrid('y', wall.from.y),
                    this.positionOnGrid('z', wall.from.z),
                ),
                new Vector3(
                    this.positionOnGrid('x', wall.to.x + 1),
                    this.positionOnGrid('y', wall.to.y + 1),
                    this.positionOnGrid('z', wall.to.z + 1),
                )
            ));
        });

        return bricks;
    }


    toString(): string {
        let output = '';

        this.iterate((val, pos) => {


            const charConfig = CHARS.find((charConfig) => charConfig.id === val) || CHARS[0];
            //console.log(charConfig,y,x);
            output += charConfig.chars[pos.x % 2];
        }, () => {
            output += '\n';
        }, () => {
            output += '\n\n\n';
        });

        return output;
    }
}