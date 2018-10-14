import Point4D from "../Point4D";
import {mat4, vec2} from "gl-matrix";
import IDrawable from "../interfaces/IDrawable";
import GLVector from "../GLVector";

export default abstract class AbstractPolygon implements IDrawable {

    protected points: Point4D[] = [];
    protected colors: Point4D[] = [];
    protected center = Point4D.Zero;
    protected transform = mat4.create();
    private readonly precision = 4;

    public isInside(center: Point4D | vec2): boolean {
        const point: vec2 = center instanceof Point4D ? center.asVec2() : center;
        let angle = 0;
        for (let i = 0; i < this.points.length; i++) {
            const prevPoint = this.points[i].asVec2();
            const currPoint = this.points[(i + 1) % this.points.length].asVec2();
            vec2.subtract(prevPoint, prevPoint, point);
            vec2.subtract(currPoint, currPoint, point);
            const vectorAngle = vec2.angle(prevPoint, currPoint);
            angle += vectorAngle;
        }
        angle = this.round(angle);
        console.log(angle);
        return angle == this.round(2 * Math.PI);
    }

    public get vectors() {
    	return this.draw();
	}

	public get count() {
    	return this.pointAmount();
	}

    protected abstract draw(): GLVector[];
    protected abstract pointAmount(): number;

    protected round(num: number): number {
        return Number(num.toFixed(this.precision));
    }

	protected setCorners(vertexCount: number, radius: number) {
		const base = Math.PI / 2;
		for (let i = 0; i < vertexCount; i++) {
			let angle = base + i * (2 * Math.PI / vertexCount);
			const x = radius * Math.cos(angle) + this.center.x;
			const y = radius * Math.sin(angle) + this.center.y;
			this.points.push(new Point4D(x, y));
		}
	}

}