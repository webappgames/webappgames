import teleport from './01-subjective/Teleport';
import fly from './01-subjective/Fly';
import push from './02-kinetics/Push';
import pull from './02-kinetics/Pull';
import bounce from './02-kinetics/Bounce';
import spin from './02-kinetics/Spin';
//import dekinetize from './02-kinetics/Dekinetize';
import duplicate from './03-create/Duplicate';
import pillar from './03-create/Pillar';
import wall from './03-create/Wall';
import plate from './03-create/Plate';
//import bridge from './03-create/Bridge';
import freeze from './04-hide/Freeze';
import dispose from './04-hide/Dispose';
import ghost from './04-hide/Ghost';
import revive from './04-hide/Revive';
import reduce from './05-transform/Reduce';
import grow from './05-transform/Grow';
import chop from './05-transform/Chop';
import desintegrate from './05-transform/Desintegrate';

export default {
    subjective: {
        teleport,
        fly
    },
    kinetics: {
        push,
        pull,
        bounce,
        spin,
        //dekinetize,
    },
    create: {
        duplicate,
        pillar,
        wall,
        //prick,
        plate,
        //bridge,
    },
    hide: {
        freeze,
        dispose,
        ghost,
        revive,
    },
    transform: {
        reduce,
        grow,
        chop,
        desintegrate
    }
};