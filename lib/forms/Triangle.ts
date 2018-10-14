import AbstractPolygon from "./AbstractPolygon";
import GLVector from "../GLVector";
import Point4D from "../Point4D";

export default class Triangle extends AbstractPolygon {

	private gl: WebGLRenderingContext;
	private position: GLVector;
	private color: GLVector;

	private center: Point4D;

	public constructor(gl: WebGLRenderingContext, center: Point4D, radius: number) {
		super();
		this.gl = gl;
		this.center = center;
		this.position = new GLVector(gl, 4);
		this.color = new GLVector(gl, 4);
		this.position.attributeName = "aPosition";
		this.color.attributeName = "aColor";
		this.setCorners(radius);
		this.colors = Array(3).fill(Point4D.White);
	}

	private setCorners(radius: number) {
		const base = Math.PI / 2;
		for (let i = 0; i < 3; i++) {
			let angle = base + i * (2 * Math.PI / 3);
			const x = radius * Math.cos(angle) + this.center.x;
			const y = radius * Math.sin(angle) + this.center.y;
			this.points.push(new Point4D(x, y));
		}
	}

	protected draw(): GLVector[] {
		this.points.forEach(p => this.position.addPoint(p));
		this.colors.forEach(c => this.color.addPoint(c));
		return [this.position, this.color];
	}

	protected pointAmount(): number {
		return 3;
	}
}