import AbstractSplit from './AbstractSplit';

export default class Desintegrate extends AbstractSplit{
    get splitParts():{x:number,y:number,z:number}{
        //todo
        return {
            x:3,
            y:3,
            z:3
        }
    }
}