export default class Vector3 {
    constructor(public x: number,
                public y: number,
                public z: number) {
    }

    toArray(): [number, number, number] {
        return [this.x, this.y, this.z];
    }
}