import AbstractPolygon from "./AbstractPolygon";
import GLVector from "../GLVector";
import Point4D from "../Point4D";

export default class Square extends AbstractPolygon {

    protected center: Point4D;
    protected sideLength: number;

    public constructor(center: Point4D, sideLength: number) {
        super();
		this.center = center;
		this.sideLength = sideLength;
        this.points.push(this.calcPoint(true, true));
		this.points.push(this.calcPoint(false, true));
		this.points.push(this.calcPoint(false, false));
		this.points.push(this.calcPoint(true, false));
		this.colors = Array(4).fill(Point4D.White);
    }

    public draw(gl: WebGLRenderingContext): GLVector[] {
        const positions = new GLVector(gl, 4);
        const colors = new GLVector(gl, 4);
        positions
			.addPoint(this.points[0])
        	.addPoint(this.points[1])
        	.addPoint(this.points[2])
        	.addPoint(this.points[0])
        	.addPoint(this.points[3])
        	.addPoint(this.points[2])
			.attributeName = "aPosition";
        colors
			.addPoint(this.colors[0])
			.addPoint(this.colors[1])
			.addPoint(this.colors[2])
			.addPoint(this.colors[0])
			.addPoint(this.colors[3])
			.addPoint(this.colors[2])
			.attributeName = "aColor";
		return [positions, colors];
    }

    public pointAmount(): number {
        return 6;
    }

    private calcPoint(isUp: boolean, isRight: boolean): Point4D {
        const up = isUp ? 1 : -1;
        const right = isRight ? 1 : -1;
        return new Point4D(this.center.x + right * this.sideLength / 2, this.center.y + up * this.sideLength / 2);
    }

}