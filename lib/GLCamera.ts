import {mat4} from "gl-matrix";

export default class GLCamera {

	private view: mat4;
	private projection: mat4;

	public constructor(z: number, aspectRatio: number) {
		this.view = this.defaultView(z);
		this.projection = this.defaultPerspective(aspectRatio);
	}

	public observe(model: mat4 = mat4.create()): mat4 {
		const result = mat4.create();
		mat4.multiply(result, this.view, model);
		mat4.multiply(result, this.projection, result);
		return result;
	}

	private defaultView(z: number) {
		const view = mat4.create();
		const eye = [0, 0, z];
		const center = Array(3).fill(0);
		const up = [0, 1, 0];
		mat4.lookAt(view, eye, center, up);
		return view;
	}

	private defaultPerspective(aspectRatio: number): mat4 {
		const perspective = mat4.create();
		const degrees = 60 * Math.PI / 180;
		mat4.perspective(perspective, degrees, aspectRatio, 0.1, 1000);
		return perspective;
	}

}