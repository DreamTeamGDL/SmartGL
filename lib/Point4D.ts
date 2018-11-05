import IPoint from "./interfaces/IPoint";
import {vec2, vec4} from "gl-matrix";

export default class Point4D implements IPoint {

	public static readonly Red = new Point4D(1, 0, 0, 1);
	public static readonly Green = new Point4D(0, 1, 0, 1);
	public static readonly Blue = new Point4D(0, 0, 1, 1);
	public static readonly White = new Point4D(1, 1, 1, 1);
	public static readonly Black = new Point4D(0, 0, 0, 1);

	public static readonly Zero = new Point4D(0, 0);

	private values: number[] = [];

	public get x() : number {return this.values[0];}
	public get y() : number {return this.values[1];}
	public get z() : number {return this.values[2];}
	public get rho() : number {return this.values[3];}

	public set x(val: number) {this.values[0] = val;}
	public set y(val: number) {this.values[1] = val;}
	public set z(val: number) {this.values[2] = val;}
	public set rho(val: number) {this.values[3] = val;}

	public constructor(
		x: number,
		y: number,
		z: number = 0,
		rho: number = 1
	) {
		this.x = x;
		this.y  = y;
		this.z = z;
		this.rho = rho;
	}

	public asArray(): number[] {
		return this.values.slice();
	}

	public getValue(index: number): number {
		return this.values[index];
	}

	public setValue(index: number, value: number) {
		this.values[index] = value;
	}

	public asVec4(): vec4 {
		return vec4.fromValues(this.x, this.y, this.z, this.rho);
	}

	public static fromVec4(point: vec4) {
		return new Point4D(point[0], point[1], point[2], point[3]);
	}

	public asVec2(): vec2 {
		return vec2.fromValues(this.x, this.y);
	}

	public static fromVec2(point: vec2) {
		return new Point4D(point[0], point[1]);
	}

}