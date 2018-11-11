

import Point4D from "../Point4D";
import Square from "./Square";
import Point from "../Point";

export default class Rectangle extends Square {

	public constructor(gl: WebGLRenderingContext, center: Point4D, ratio: number) {
		super(gl, center, 0.25);
		this.scale(ratio, 1);
	}

	public setPoints(points: Point4D[]) {
		this.points = points;
	}
}