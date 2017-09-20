class Log{
    constructor(){
        console.log('Logging to default console.');
    }
    send(...objects:any[]){
        console.log(...objects);
    }
}

export default new Log();