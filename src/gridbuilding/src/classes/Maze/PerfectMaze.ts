/*import Vector3 from '../Vector3';
//import BuildingData from '../BuildingDataModel';

export function createGrid(size:IVector2):boolean[][]{
    const grid:boolean[][] = [];
    for (let y = 0; y < size.y * 2 + 1; y++) {
        grid[y] = [];
        for (let x = 0; x < size.x * 2 + 1; x++) {
            if(x===0 || y===0 || x===size.x*2 || y===size.y*2 ){
                grid[y][x] = true;
            }
            else{
                grid[y][x] = false;
            }
        }
    }
    return grid;
}

export function createStarts(size:IVector2):IVector2[]{
    const starts:IVector2[] = [];
    for(let y = 0; y < size.y - 1; y++) {
        for (let x = 0; x < size.x - 1; x++) {
            starts.push({x:x*2+2,y:y*2+2});
        }
    }
    return starts;
}

export function finishGrid(grid:boolean[][],starts:IVector2[]){
    const DIRECTIONS = [
        {x:1,y:0},
        {x:-1,y:0},
        {x:0,y:1},
        {x:0,y:-1},
    ];
    while(starts.length!==0){

        const start = starts[Math.floor(Math.random()*starts.length)];
        const direction = DIRECTIONS[Math.floor(Math.random()*DIRECTIONS.length)];

        let currentPosition = start;
        while(!grid[currentPosition.y][currentPosition.x]){

            grid[currentPosition.y][currentPosition.x] = true;
            currentPosition = {
                x: currentPosition.x + direction.x,
                y: currentPosition.y + direction.y,
            }

        }

        starts = starts.filter((start)=>!grid[start.y][start.x]);
    }
}
/*
export default class PerfectMaze extends BuildingData{
    constructor(size:IVector2) {
        const grid = createGrid(size);
        finishGrid(grid,createStarts(size));
        super([grid]);
    }
}*/