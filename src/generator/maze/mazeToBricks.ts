//todo where should be this file?
import IMaze from '../../interfaces/IMaze';
import World from '../../world/classes/World';
import Box from '../../world/classes/bricks/Box';
import * as BABYLON from 'babylonjs';

interface IMazeToBrickOptions{
    mazeHeight: number;
    wallThick: number;
    cellSize: number;
}

export default function(maze:IMaze,options:IMazeToBrickOptions,world:World):Box[]{

    const boxes:Box[] = [];
    const {horizontal,vertical} = maze.toWalls();

    for(let y=0;y<horizontal.length;y++){
        for(let x=0;x<horizontal[y].length;x++){


            if(horizontal[y][x]) {
                boxes.push(new Box(
                    world,
                    'stone-plain',
                    new BABYLON.Vector3(options.cellSize - options.wallThick, options.mazeHeight, options.wallThick),
                    new BABYLON.Vector3((x + .5) * options.cellSize, options.mazeHeight / 2, (y) * options.cellSize)
                ));
            }
        }
    }


    for(let y=0;y<vertical.length;y++){
        for(let x=0;x<vertical[y].length;x++){


            if(vertical[y][x]) {
                boxes.push(new Box(
                    world,
                    'stone-plain',
                    new BABYLON.Vector3(options.wallThick, options.mazeHeight, options.cellSize - options.wallThick),
                    new BABYLON.Vector3((x) * options.cellSize, options.mazeHeight / 2, (y + .5) * options.cellSize)
                ));
            }
        }
    }

    return boxes;
}