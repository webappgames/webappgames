import AbstractSplit from './AbstractSplit';

export default class Desintegrate extends AbstractSplit{
    get splitParts():{x:number,y:number,z:number}{
        const dimensions = ['x','y','z'].map((axis)=>{
            let chop = 3;//todo better limit
            const scaling = this.firstTargetBrick.size[axis];
            while(scaling/chop<1/*todo why is the smallest piece 1x1x1?*/&&chop!==1){
                chop--;
            }
            return chop;
        });
        return {
            x:dimensions[0],
            y:dimensions[1],
            z:dimensions[2]
        }
    }
}