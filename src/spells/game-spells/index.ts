import teleport from './01-subjective/Teleport';
import fly from './01-subjective/Fly';
import noclip from './01-subjective/Noclip';
import bounce from './02-kinetics/Bounce';
import push from './02-kinetics/Push';
import pull from './02-kinetics/Pull';
import dekinetize from './02-kinetics/Dekinetize';
import freeze from './02-kinetics/Freeze';
import duplicate from './03-create/Duplicate';
import bridge from './03-create/Bridge';
import dispose from './04-hide/Dispose';
import stash from './04-hide/Stash';
import reduce from './05-transform/Reduce';
import grow from './05-transform/Grow';
import desintegrate from './05-transform/Desintegrate';

export default {
    subjective: {
        teleport,
        fly,
        noclip
    },
    kinetics: {
        bounce,
        push,
        pull,
        dekinetize,
        freeze
    },
    create: {
        duplicate,
        bridge
    },
    hide: {
        dispose,
        stash
    },
    transform: {
        reduce,
        grow,
        desintegrate
    }
};