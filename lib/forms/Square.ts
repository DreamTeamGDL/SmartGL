import AbstractPolygon from "./AbstractPolygon";
import GLVector from "../GLVector";
import Point4D from "../Point4D";

export default class Square extends AbstractPolygon {

    protected sideLength: number;
    private gl: WebGLRenderingContext;

    public constructor(gl: WebGLRenderingContext, center: Point4D, sideLength: number) {
        super();
        this.gl = gl;
		this.center = center;
		this.sideLength = sideLength;
        this.setCorners(4, sideLength);
		this.colors = Array(4).fill(Point4D.White);
		this.rotate(Math.PI / 4);
    }

    public draw(): GLVector[] {
        const positions = new GLVector(this.gl, 4);
        const colors = new GLVector(this.gl, 4);
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

    public 	pointAmount(): number {
        return 6;
    }
}