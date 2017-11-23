//import * as BABYLON from 'babylonjs';
import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';
import Box from '../../../world/classes/bricks/Box';

export default class AbstractResize extends AbstractSpellOnMeshes {

    public EFFECT_COLORS = {
        color1: '#45ff00',
        color2: '#8000ff'
    };

    get price(): number {
        return 0;
    }

    get scaling(): number {
        return 1;
    }

    finish() {
        super.finish();

        this.firstTargetBrick.replaceBy(
            new Box(
                this.world,
                this.firstTargetBrick.materialId,
                this.firstTargetBrick.size.scale(this.scaling),
                this.firstTargetBrick.position.clone(),
                this.firstTargetBrick.rotation.clone(),
                this.firstTargetBrick.linearVelocity,
                this.firstTargetBrick.angularVelocity
            )
        );
    }

}