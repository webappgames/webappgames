import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';

export default class Perseids extends AbstractSpellOnMeshes{

    public EFFECT_COLORS = {
        color1: '#ff81f0',
        color2: '#8000ff'
    };

    get price():number{
        return 0;
    }
    get scaling():number{
        return 1;
    }

    finish(){
        super.finish();

        let limit = 33;
        const interval = setInterval(()=>{

            this.world.setMeteoriteTarget(this.firstTargetBrick);
            if(limit--<0){
                clearInterval(interval);
            }

        },2);


    }

}