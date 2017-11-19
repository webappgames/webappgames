export default class Vector3 {
    constructor(public x: number,
                public y: number,
                public z: number) {
    }

    add(vector3: Vector3): Vector3 {
        return new Vector3(
            this.x + vector3.x,
            this.y + vector3.y,
            this.z + vector3.z
        );
    }

    subtract(vector3: Vector3): Vector3 {
        return new Vector3(
            this.x - vector3.x,
            this.y - vector3.y,
            this.z - vector3.z
        );
    }

    scale(scale: number): Vector3 {
        return new Vector3(
            this.x * scale,
            this.y * scale,
            this.z * scale
        );
    }

    toArray(): [number, number, number] {
        return [this.x, this.y, this.z];
    }
}