import AbstractSplit from './AbstractSplit';

export default class Chop extends AbstractSplit{
    get splitParts():{x:number,y:number,z:number}{
        //todo
        return {
            x:1,
            y:2,
            z:1
        }
    }
}