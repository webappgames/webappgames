import AbstractBrick from '../world/classes/bricks/AbstractBrick';
//import Box from '../world/classes/bricks/Box';

export default class{

    public bricks: AbstractBrick[];


    constructor(
      ...bricks: AbstractBrick[]
    ){
        this.bricks = bricks;//[];

        /*for(let brick of bricks){
            this.push(brick);
        }*/
    }


    /*push(newBrick: AbstractBrick) {

        const colliding = [];

        for (const brick of this.bricks) {
            if (brick.intersectWith(newBrick)) {
                colliding.push(brick);
            }
        }

        newBrick.mergeWith(...colliding);



        if(newBrick instanceof Box) {
            for (let brick of this.bricks) {
                if(brick instanceof Box) {




                    const {originalBrick, newBricks} = brick.mergeWith(newBrick);

                    if (originalBrick.isDisposed) {
                        this.bricks = this.bricks.filter((brick) => brick !== originalBrick)
                    }

                    for (let newBrick of newBricks) {
                        this.bricks.push(newBrick);
                    }






                }
            }
        }else{
            this.bricks.push(newBrick);
        }
        //newBrick.dispose();
        //this.bricks.push(newBrick);
    }*/
}