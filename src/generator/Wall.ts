import {IVector3} from '../interfaces/IVectors';

export default class Wall {
    constructor(public from: IVector3,
                public to: IVector3) {
    }

    isJoinable(wall2: Wall): boolean {
        const wall1 = this;
        return (
            [
                {
                    axis1: 'x',
                    axis2: 'y',
                    axis3: 'z'
                },
                {
                    axis1: 'y',
                    axis2: 'z',
                    axis3: 'x'
                },
                {
                    axis1: 'z',
                    axis2: 'x',
                    axis3: 'y'
                }

            ].some(({axis1, axis2, axis3}) => (
                (
                    (wall1.from[axis1] === wall2.from[axis1] && wall1.to[axis1] === wall2.to[axis1])
                    &&
                    (wall1.from[axis2] === wall2.from[axis2] && wall1.to[axis2] === wall2.to[axis2])
                ) &&
                (wall1.to[axis3] + 1 === wall2.from[axis3] || wall2.to[axis3] + 1 === wall1.from[axis3])
            ))
        )
    }

    /*joinWithInPlace(wall2: Wall): void {
        const wall1 = this;
        this.from = {
            x: Math.min(wall1.from.x, wall2.from.x),
            y: Math.min(wall1.from.y, wall2.from.y),
            z: Math.min(wall1.from.z, wall2.from.z),
        };
        this.to = {
            x: Math.max(wall1.to.x, wall2.to.x),
            y: Math.max(wall1.to.y, wall2.to.y),
            z: Math.max(wall1.to.z, wall2.to.z),
        };
    }*/

    joinWith(wall2: Wall): Wall {
        const wall1 = this;
        return new Wall(
            {
                x: Math.min(wall1.from.x, wall2.from.x),
                y: Math.min(wall1.from.y, wall2.from.y),
                z: Math.min(wall1.from.z, wall2.from.z),
            }, {
                x: Math.max(wall1.to.x, wall2.to.x),
                y: Math.max(wall1.to.y, wall2.to.y),
                z: Math.max(wall1.to.z, wall2.to.z),
            }
        );
    }

    static joinWalls(originalWalls: Wall[]): Wall[] {


        function joinWallToWalls(oldWalls: Wall[], newWall: Wall): Wall[] {

            let joinedWall = newWall;
            const newWalls: Wall[] = [];
            for (const oldWall of oldWalls) {
                if (joinedWall.isJoinable(oldWall)) {
                    joinedWall = newWall.joinWith(oldWall);
                } else {
                    newWalls.push(oldWall);
                }
            }


            if (joinedWall !== newWall) {
                return joinWallToWalls(newWalls, joinedWall);
            } else {
                newWalls.push(newWall);
                return newWalls;
            }


        }


        let newWalls: Wall[] = [];
        for (const wall of originalWalls) {
            newWalls = joinWallToWalls(newWalls, wall);
        }
        return newWalls;


        /*console.log(`Joining ${originalWalls.length} walls.`);

        let unaffectedWalls: Wall[] = [];
        let newJoinedWalls:  Wall[] = [];


        for (const originalWall of originalWalls) {

            const joinableWall = unaffectedWalls.find((wall) => wall.isJoinable(originalWall));

            if (typeof joinableWall === 'undefined') {
                unaffectedWalls.push(originalWall);
            } else {
                console.log(`Joining`,originalWall,joinableWall);

                unaffectedWalls = unaffectedWalls.filter((wall)=>wall!==joinableWall);

                const newJoinedWall = originalWall.joinWith(joinableWall);
                newJoinedWalls.push(newJoinedWall);

                console.log(`Into`,newJoinedWalls);
            }
        }

        if(newJoinedWalls.length>1){
             newJoinedWalls = Wall.joinWalls(newJoinedWalls);
        }

        return unaffectedWalls.concat(newJoinedWalls);*/
    }
}