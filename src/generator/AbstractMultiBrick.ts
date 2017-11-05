import AbstractBrick from '../world/classes/bricks/AbstractBrick';

export default class{

    public bricks: AbstractBrick[];

    constructor(
      ...bricks: AbstractBrick[]
    ){
        this.bricks = bricks;
    }
}