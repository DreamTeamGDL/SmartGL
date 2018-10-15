import AbstractPolygon from "./AbstractPolygon";
import GLVector from "../GLVector";
import Point4D from "../Point4D";

export default class Triangle extends AbstractPolygon {

	private gl: WebGLRenderingContext;

	public constructor(gl: WebGLRenderingContext, center: Point4D, radius: number) {
		super();
		this.gl = gl;
		this.center = center;
		this.setCorners(3, radius);
		this.colors = Array(3).fill(Point4D.White);
	}

	protected draw(): GLVector[] {
		const position = new GLVector(this.gl, 4);
		const color = new GLVector(this.gl, 4);
		position.attributeName = "aPosition";
		color.attributeName = "aColor";
		this.points.forEach(p => position.addPoint(p));
		this.colors.forEach(c => color.addPoint(c));
		return [position, color];
	}

	protected pointAmount(): number {
		return 3;
	}
}