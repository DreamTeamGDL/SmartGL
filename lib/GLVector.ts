
import IPoint from "./interfaces/IPoint";
import IBufferSettings from "./interfaces/IBufferSettings";
import {mat4} from "gl-matrix";

export default class GLVector implements Iterable<IPoint> {

	public readonly size: number;
	public readonly program: WebGLProgram;

	private readonly gl: WebGLRenderingContext;

	private points: IPoint[];
	private transformMatrix: mat4 | null = null;
	private attributeAddress: number = -1;
	private bufferObj: WebGLBuffer | null = null;
	private rawArray: Float32Array | null = null;
	private bufferSettings: IBufferSettings[] = [];
	private currentSetting = 0;

	public static reuse(other: GLVector): GLVector {
		const vector = new GLVector(other.gl, other.size);
		vector.attributeAddress = other.attributeAddress;
		vector.bufferObj = other.bufferObj;
		return vector;
	}

	public constructor(
		gl: WebGLRenderingContext,
		elementSize: number,
		vertex: string = "shader-vs",
		fragment: string = "shader-fs"
	) {
		this.gl = gl;
		this.size = elementSize;
		this.points = [];

		const vertexCodeElement = document.getElementById(vertex);
		const fragmentCodeElement = document.getElementById(fragment);

		if (vertexCodeElement == null || fragmentCodeElement == null) {
			throw new Error("Could not find shaders");
		}

		const vertexShaderSrc = vertexCodeElement.innerText;
		const fragmentShaderSrc = fragmentCodeElement.innerText;

		const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSrc);
		const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSrc);

		this.program = this.createProgram(vertexShader, fragmentShader);

	}

	public get buffer(): WebGLBuffer {
		if (this.bufferObj == null) {
			this.bufferObj = this.initBuffer();
		}
		return this.bufferObj;
	}

	public get transform(): mat4 {
		if (this.transformMatrix == null) {
			this.transformMatrix = mat4.create();
		}
		return this.transformMatrix;
	}

	public set transform(matrix: mat4) {
		this.transformMatrix = matrix;
	}

	public get attribute(): number {
		return this.attributeAddress;
	}

	public set attributeName(name: string) {
		this.attributeAddress = this.gl.getAttribLocation(this.program, name);
	}

	public addPoint(point: IPoint): GLVector {
		this.points.push(point);
		return this;
	}

	public addBufferSetting(setting: IBufferSettings) {
		this.bufferSettings.push(setting);
	}

	public nextBufferSettings(): IBufferSettings {
		const settings = this.bufferSettings[this.currentSetting];
		this.currentSetting++;
		this.currentSetting %= this.bufferSettings.length;
		return settings;
	}

	public hasBufferSettings(): boolean {
		return this.bufferSettings.length != 0;
	}

	public get array(): Float32Array {
		const array: number[] = [];
		this.points.forEach(point => {
			const rawPoint = point.asArray();
			for (let i = 0; i < this.size; i++) {
				array.push(rawPoint[i]);
			}
		});
		this.rawArray = new Float32Array(array);
		return this.rawArray;
	}

	public updateBuffer(): void {
		const values = this.array;
		this.gl.bufferData(this.gl.ARRAY_BUFFER, values, this.gl.STATIC_DRAW);
	}

	public initBuffer(): WebGLBuffer {
		const buffer = this.gl.createBuffer();
		if (buffer == null) throw new Error("Buffer could not be allocated");
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
		this.updateBuffer();
		return buffer;
	}

	public [Symbol.iterator](): Iterator<IPoint> {
		return this.points.values();
	}

	private createShader(type: number, source: string): WebGLShader {
		const shader = this.gl.createShader(type);
		if (shader == null) throw new Error("Shader could not be created");
		this.gl.shaderSource(shader, source);
		this.gl.compileShader(shader);
		const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
		if (!success) {
			const log = this.gl.getShaderInfoLog(shader);
			this.gl.deleteShader(shader);
			throw new Error(`Could not create shader: \n${log}`);
		}
		return shader;
	}

	private createProgram(...shaders: WebGLShader[]): WebGLProgram {
		const program = this.gl.createProgram();
		if (program == null) throw new Error("Program could not be created");
		shaders.forEach(shader => this.gl.attachShader(program, shader));
		this.gl.linkProgram(program);
		const success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
		if (!success) {
			const log = this.gl.getProgramInfoLog(program);
			this.gl.deleteProgram(program);
			throw new Error(`Could not create shader: \n${log}`);
		}
		return program;
	}

}