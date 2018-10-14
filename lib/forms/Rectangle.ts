
import GLVector from "../GLVector";
import Point4D from "../Point4D";
import Square from "./Square";
import {mat4} from "gl-matrix";

export default class Rectangle extends Square {

	public constructor(gl: WebGLRenderingContext, center: Point4D, ratio: number) {
		super(gl, center, 0.5);
		mat4.scale(this.transform, this.transform, [1, ratio, 1]);
	}
}