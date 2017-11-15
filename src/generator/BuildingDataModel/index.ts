import {IVector3} from '../../interfaces/IVectors';
import {CHARS} from './config';
import Grid3D from './Grid3D';
import {isNull} from "util";

interface IWall {
    from: IVector3;
    to: IVector3;
}

export default class BuildingDataModel extends Grid3D<string>{


    getWalls(): IWall[] {

        const walls: IWall[] = [];

        ['HORIZONTAL','VERTICAL', 'PILLAR', 'PLATE'].forEach((cellType) => {


            let newWall: null | IWall = null;
            const commitNewWall = () => {
                if (!isNull(newWall)) {
                    walls.push(newWall);
                    newWall = null;
                }
            };

            this.getBooleanGrid(cellType).iterate((val, pos) => {

                if (val) {
                    if (isNull(newWall)) {
                        newWall = {from: pos, to: pos};
                    } else {
                        newWall = {from: newWall.from, to: pos};
                    }

                } else {
                    commitNewWall();
                }

            }, commitNewWall, commitNewWall);


        });

        return walls;
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