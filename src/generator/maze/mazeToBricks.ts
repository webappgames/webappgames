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

export default function(maze:IMaze,center:BABYLON.Vector3,options:IMazeToBrickOptions,world:World):Box[]{

    const boxes:Box[] = [];
    const {horizontal,vertical} = maze.toWalls();


    const moveBy = center.add(new BABYLON.Vector3(
        options.cellSize * horizontal.length,
        0,
        options.cellSize * vertical.length,
    ).scale(-.5));


    [{walls:horizontal,rotation:0},{walls:vertical,rotation:Math.PI/2}].forEach(({walls,rotation})=>{

        for(let y=0;y<walls.length;y++){
            for(let x=0;x<walls[y].length;x++){


                if(walls[y][x]) {
                    boxes.push(new Box(
                        world,
                        'clay-bricks',
                        new BABYLON.Vector3(
                            options.cellSize,// - options.wallThick,
                            options.mazeHeight,
                            options.wallThick
                        ),
                        new BABYLON.Vector3(
                            moveBy.x + (x + Math.cos(rotation)*.5) * options.cellSize,
                            moveBy.y + options.mazeHeight / 2,
                            moveBy.z + (y + Math.sin(rotation)*.5) * options.cellSize
                        ),
                        new BABYLON.Vector3(
                            0,
                            rotation,
                            0
                        )
                    ));
                }
            }
        }

    });




    /*for(let y=0;y<vertical.length;y++){
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
    }*/

    return boxes;
}