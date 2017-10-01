import AbstractSplit from './AbstractSplit';

export default class Chop extends AbstractSplit{
    get splitParts():{x:number,y:number,z:number}{
        const dimensions = ['x','y','z'].map((axis)=>({
                axis,
                scaling: this.firstTargetMesh.scaling[axis]
            })).sort((a,b)=>a.scaling<b.scaling?1:-1);
        //console.log(dimensions);
        const axis = dimensions[0].axis;

        return {
            x:axis==='x'?2:1,
            y:axis==='y'?2:1,
            z:axis==='z'?2:1
        }
    }
}