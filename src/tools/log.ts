class Log{
    constructor(){
        console.log('Logging to default console.');
    }
    send(...messages:any[]){
        console.log(...messages);
    }
}

export default new Log();