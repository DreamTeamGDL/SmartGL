import IPoint from "./IPoint";

export default class Point4D implements IPoint {

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
		if (arguments.length == 3) this.z = 1;
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

}