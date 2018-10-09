import IPoint from "./IPoint";

export default class Point implements IPoint {

	private size: number;
	private points: number[];

	public constructor(...points: number[]) {
		this.size = arguments.length;
		this.points = points;
	}

	public asArray(): number[] {
		return this.points.slice();
	}

}