export default function(x:number,y:number) {

    let n = x * y - 1;
    if (n < 0) {
        throw new Error(`illegal maze dimensions (${x} x ${y} < 1)`);
    } else {


        let horiz: boolean[][] = [];
        for (let j = 0; j < x + 1; j++) horiz[j] = [];
        let verti: boolean[][] = [];
        for (let j = 0; j < x + 1; j++) verti[j] = [];
        let here = [Math.floor(Math.random() * x), Math.floor(Math.random() * y)];
        let path = [here];
        let unvisited: boolean[][] = [];
        for (let j = 0; j < x + 2; j++) {
            unvisited[j] = [];
            for (let k = 0; k < y + 1; k++)
                unvisited[j].push(j > 0 && j < x + 1 && k > 0 && (j != here[0] + 1 || k != here[1] + 1));
        }
        while (0 < n) {
            let potential = [[here[0] + 1, here[1]], [here[0], here[1] + 1],
                [here[0] - 1, here[1]], [here[0], here[1] - 1]];
            let neighbors = [];
            for (let j = 0; j < 4; j++)
                if (unvisited[potential[j][0] + 1][potential[j][1] + 1])
                    neighbors.push(potential[j]);
            if (neighbors.length) {
                n = n - 1;
                let next = neighbors[Math.floor(Math.random() * neighbors.length)];
                unvisited[next[0] + 1][next[1] + 1] = false;
                if (next[0] == here[0])
                    horiz[next[0]][(next[1] + here[1] - 1) / 2] = true;
                else
                    verti[(next[0] + here[0] - 1) / 2][next[1]] = true;
                path.push(here = next);
            } else
                here = path.pop() as number[];
        }

        return ({x: x, y: y, horizontal: horiz, vertical: verti});


    }
}



export function mazeToString(maze:any):string {

    let text = [];
    for (let j= 0; j<maze.x*2+1; j++) {
        let line = [];
        if (0 == j%2)
            for (let k=0; k<maze.y*4+1; k++)
                if (0 == k%4)
                    line[k] = '+';
                else
                if (j>0 && maze.vertical[j/2-1][Math.floor(k/4)])
                    line[k] = ' ';
                else
                    line[k] = '-';
        else
            for (let k=0; k<maze.y*4+1; k++)
                if (0 == k%4)
                    if (k>0 && maze.horizontal[(j-1)/2][k/4-1])
                        line[k] = ' ';
                    else
                        line[k] = '|';
                else
                    line[k] = ' ';
        if (0 == j) line[1] = line[2] = line[3] = ' ';
        if (maze.x*2-1 == j) line[4*maze.y]= ' ';
        text.push(line.join('')+'\r\n');
    }
    const OUTPUT = text.join('');
    return OUTPUT;
}