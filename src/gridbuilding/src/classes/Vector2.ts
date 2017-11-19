export default class Vector2 {
    constructor(public x: number,
                public y: number) {}

    add(vector3: Vector2): Vector2 {
        return new Vector2(
            this.x + vector3.x,
            this.y + vector3.y
        );
    }

    subtract(vector3: Vector2): Vector2 {
        return new Vector2(
            this.x - vector3.x,
            this.y - vector3.y
        );
    }

    scale(scale: number): Vector2 {
        return new Vector2(
            this.x * scale,
            this.y * scale
        );
    }

    toArray(): [number, number] {
        return [this.x, this.y];
    }
}