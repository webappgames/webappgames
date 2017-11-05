import PerfectMaze from './PerfectMaze';
import IVector2 from '../../interfaces/IVector2';

export default class Maze extends PerfectMaze{
    static createStarts(){
        return super.createStarts().filter((position)=>Math.random()>.5);
    }


    static finishGrid(grid:boolean[][],starts:IVector2[]) {

        for(let i=0;i<5;i++){
            const randomStart = starts[Math.floor(Math.random() * starts.length)];
            grid[randomStart.y][randomStart.x] = true;
        }

        super.finishGrid(grid,starts);
    }

}
