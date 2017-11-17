import {CHARS} from './config';
import Grid3 from '../Grid3';
import Wall from '../Wall';

export default class BuildingDataModel extends Grid3<string> {
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