
import Point4D from "../Point4D";
import {mat4, vec2, vec4} from "gl-matrix";
import IDrawable from "../interfaces/IDrawable";
import GLVector from "../GLVector";

export default abstract class AbstractPolygon implements IDrawable {

	protected points: Point4D[] = [];
	protected colors: Point4D[] = [];

	protected center = Point4D.Zero;
	protected angle = 0;
	protected width = 1;
	protected height = 1;

	public get Center() {
		return this.center;
	}

	public get Angle() {
		return this.angle;
	}

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
			this.points.push(new Point4D(x, y, this.center.z));
		}
	}

	public setColor(color: Point4D) {
		const count = this.colors.length;
		this.colors = [];
		for (let i = 0; i < count; i++) {
			this.colors.push(color);
		}
	}

	public scale(x: number, y: number, scaleTo: boolean = false) {
		if (scaleTo) this.scale(1 / this.width, 1 / this.height);
		const matrix = mat4.create();
		const center = this.center;
		this.translate(-center.x, -center.y);
		mat4.scale(matrix, matrix, [x, y, 1]);
		this.transformPoints(matrix);
		this.translate(center.x, center.y);
		this.width = x;
		this.height = y;
	}

	public rotate(angle: number, rotateTo: boolean = false) {
		if (rotateTo) this.rotate(-this.angle);
		const matrix = mat4.create();
		const center = this.center;
		this.translate(-center.x, -center.y);
		mat4.rotate(matrix, matrix, angle, [0, 0, 1]);
		this.transformPoints(matrix);
		this.translate(center.x, center.y);
		this.angle = angle;
	}

	public translate(x: number, y: number, z: number = 0, moveTo: boolean = false) {
		if (moveTo) this.translate(-this.center.x, -this.center.y);
		const matrix = mat4.create();
		mat4.translate(matrix, matrix, [x, y, z]);
		this.transformPoints(matrix);
		this.center = new Point4D(
			this.center.x + x,
			this.center.y + y,
			this.center.z + z
		);
	}

	private transformPoints(matrix: mat4) {
		const transformed: Point4D[] = [];
		for (let point of this.points) {
			const vector = point.asVec4();
			vec4.transformMat4(vector, vector, matrix);
			transformed.push(Point4D.fromVec4(vector));
		}
		this.points = transformed;
	}

}