//import * as BABYLON from 'babylonjs';
import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';
import Box from '../../../world/classes/bricks/Box';

export default class AbstractSplit extends AbstractSpellOnMeshes {

    public EFFECT_COLORS = {
        color1: '#45ff00',
        color2: '#8000ff'
    };

    get splitParts(): { x: number, y: number, z: number } {
        return {
            x: 1,
            y: 2,
            z: 3
        }
    }

    get price(): number {
        return 0;
    }

    finish() {
        super.finish();
        //todo preserve rotation
        //todo prevent duplicating
        //todo preserve velocity linear/angular
        const parts = this.splitParts;
        for (let z = 0; z < parts.z; z++) {
            const zC = (z + .5) * (1 / parts.z);
            for (let y = 0; y < parts.y; y++) {
                const yC = (y + .5) * (1 / parts.y);
                for (let x = 0; x < parts.x; x++) {
                    const xC = (x + .5) * (1 / parts.x);

                    new Box(
                        this.world,
                        this.firstTargetBrick.materialId,
                        this.firstTargetBrick.size.multiplyByFloats(1 / parts.x, 1 / parts.y, 1 / parts.z),
                        this.firstTargetBrick.position.add(this.firstTargetBrick.size.multiplyByFloats(xC - .5, yC - .5, zC - .5)),
                        this.firstTargetBrick.rotation.clone(),
                        this.firstTargetBrick.linearVelocity,
                        this.firstTargetBrick.angularVelocity
                    );
                }
            }
        }
        this.firstTargetBrick.dispose();
    }
}