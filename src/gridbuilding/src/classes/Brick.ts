import Vector3 from './Vector3';

export default class Brick {
    constructor(public from: Vector3,
                public to: Vector3) {
    }
    get size(): Vector3 {
        return this.to.subtract(this.from);
    }
    get center(): Vector3 {
        return this.from.add(this.to).scale(.5);
    }
}