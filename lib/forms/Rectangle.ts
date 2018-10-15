

import Point4D from "../Point4D";
import Square from "./Square";

export default class Rectangle extends Square {

	public constructor(gl: WebGLRenderingContext, center: Point4D, ratio: number) {
		super(gl, center, 0.5);
		this.scale(ratio, 1);
	}
}