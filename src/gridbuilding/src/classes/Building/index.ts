import {CHARS} from './config';
import Vector3 from '../Vector3';
import Grid3 from '../Grid3';
import Wall from '../Grid3Brick';
import Brick from '../Brick';

export default class Building extends Grid3<string> {
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

    getBricks(): Brick[]{

        const sizes = {
          x: [1,10],
          y: [1,10],
          z: [1,10],
        };

        const bricks: Brick[] = [];

        function wallPosition(x: number) {
            let position = Math.floor(x / 2) * (sizes.x[0] + sizes.x[1]);
            if (x % 2 === 1) {
                position += sizes.x[0];
            }
            return position;
        }

        this.getWalls().forEach((wall) => {

            const from = {
                x: wallPosition(wall.from.x),
                y: wallPosition(wall.from.y),
                z: wallPosition(wall.from.z),
            };

            const to = {
                x: wallPosition(wall.to.x + 1),
                y: wallPosition(wall.to.y + 1),
                z: wallPosition(wall.to.z + 1),
            };


            bricks.push(new Brick(
                new Vector3(
                    to.x - from.x,
                    to.z - from.z,
                    to.y - from.y//options.sizes.walls.width
                ),
                new Vector3(
                    +(from.x + to.x) / 2,
                    +(from.z + to.z) / 2,
                    -(from.y + to.y) / 2
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