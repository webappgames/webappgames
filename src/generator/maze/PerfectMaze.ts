import IVector2 from '../../interfaces/IVector2';
import IMaze from '../../interfaces/IMaze';

export default class PerfectMaze implements IMaze{


    public grid:boolean[][];

    constructor(public size:IVector2) {
        this.grid = this.createGrid();
        this.finishGrid(this.grid,this.createStarts());
    }

    createGrid():boolean[][]{
        const grid:boolean[][] = [];
        for (let y = 0; y < this.size.y * 2 + 1; y++) {
            grid[y] = [];
            for (let x = 0; x < this.size.x * 2 + 1; x++) {
                if(x===0 || y===0 || x===this.size.x*2 || y===this.size.y*2 ){
                    grid[y][x] = true;
                }
                else{
                    grid[y][x] = false;
                }
            }
        }
        return grid;
    }

    createStarts():IVector2[]{
        const starts:IVector2[] = [];
        for(let y = 0; y < this.size.y - 1; y++) {
            for (let x = 0; x < this.size.x - 1; x++) {
                starts.push({x:x*2+2,y:y*2+2});
            }
        }
        return starts;
    }

    finishGrid(grid:boolean[][],starts:IVector2[]){
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

            starts = starts.filter((start)=>!this.grid[start.y][start.x]);
        }
    }



    toWalls(){

        const horizontal:boolean[][] = [];
        const vertical:boolean[][] = [];


        for(let y = 0; y < this.size.y+1; y++) {
            horizontal[y] = [];
            for (let x = 0; x < this.size.x; x++) {
                horizontal[y][x] = this.grid[y*2+0][x*2+1];
            }
        }


        for(let y = 0; y < this.size.y; y++) {
            vertical[y] = [];
            for (let x = 0; x < this.size.x+1; x++) {
                vertical[y][x] = this.grid[y*2+1][x*2+0];
            }
        }


        return {horizontal,vertical}

    }



    toString():string{
        return PerfectMaze.gridToString(this.grid);
    }


    static gridToString(grid:boolean[][]):string {
        let output = '';
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                output+=grid[y][x]?'██':'  ';
            }
            output+='\n';
        }
        return output;
    }

}