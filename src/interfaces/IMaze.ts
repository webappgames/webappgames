export default interface IMaze{
    toWalls:()=>{
        vertical:boolean[][];
        horizontal:boolean[][];
    };
    toString:()=>string;
}
