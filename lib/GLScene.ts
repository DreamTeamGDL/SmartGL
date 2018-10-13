
import GLVector from "./GLVector";
import IDrawable from "./interfaces/IDrawable";

export default abstract class GLScene {

	protected gl: WebGLRenderingContext;
	protected canvas: HTMLCanvasElement;
	protected renderingMode: number;
	protected animate: boolean;

	protected drawables: IDrawable[] = [];

	public constructor(canvasId: string, animate: boolean) {
		this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
		const gl: WebGLRenderingContext | null = this.canvas.getContext("webgl");
		if (gl == null) throw new Error("Could not obtain WebGL Context");
		this.gl = gl;
		this.renderingMode = this.gl.TRIANGLES;
		this.animate = animate;
	}

	public static createAsync<T extends GLScene>(
		sceneClass: new (canvasId: string, animate: boolean) => T,
		canvasId: string,
		animate: boolean = false
	): Promise<T> {
		return new Promise<T>((res, rej) => {
			document.addEventListener("DOMContentLoaded", () => {
				const scene = new sceneClass(canvasId, animate)
				scene.onInit();
				res(scene);
			});
		});
	}

	public launch: () => void = () => {
		this.gl.clearColor(0, 0, 0, 1);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		this.render();
		if (this.animate) {
			this.onUpdate();
			requestAnimationFrame(this.launch);
		}
	}

	public nextFrame() {
		requestAnimationFrame(this.launch);
	}

	protected draw(vectors: GLVector[], count: number = 3, x: number = 0, y: number = 0): void {
		this.gl.viewport(x, y, this.canvas.width, this.canvas.height);
		for (let vector of vectors) this.drawVector(vector);
		this.gl.drawArrays(this.renderingMode, 0, count);
	}

	private drawVector(vector: GLVector) {
		this.gl.useProgram(vector.program);
		this.uniformBindings(vector);
		this.gl.enableVertexAttribArray(vector.attribute);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vector.buffer);
		this.setAttributePointer(vector.attribute, vector.size);
	}

	protected setAttributePointer(attribute: number, size: number, stride: number = 0, offset: number = 0) {
		this.gl.vertexAttribPointer(attribute, size, this.gl.FLOAT, false, stride, offset);
	}

	protected onInit() {

	}

	protected uniformBindings(vector: GLVector) {

	}

	protected onUpdate = () => {

	}

	protected render() {
		for (let drawable of this.drawables) {
			this.draw(drawable.vectors, drawable.count);
		}
	}

}