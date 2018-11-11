import AbstractPolygon from "./AbstractPolygon";
import GLVector from "../GLVector";
import Point4D from "../Point4D";

export default class Square extends AbstractPolygon {

    protected sideLength: number;
    private readonly gl: WebGLRenderingContext;

    private readonly positionBuf: GLVector;
    private readonly colorBuf: GLVector;

    public constructor(gl: WebGLRenderingContext, center: Point4D, sideLength: number) {
        super();
        this.gl = gl;
        this.positionBuf = new GLVector(this.gl, 4);
        this.positionBuf.attributeName = "aPosition";
        this.colorBuf = new GLVector(this.gl, 4);
        this.colorBuf.attributeName = "aColor";

        this.center = center;
        this.sideLength = sideLength;
        this.setCorners(4, sideLength);
        this.colors = Array(4).fill(Point4D.White);
        this.rotate(Math.PI / 4);
    }

    public draw(): GLVector[] {
        this.positionBuf.clear();
        this.colorBuf.clear();
        this.positionBuf
            .addPoint(this.points[0])
            .addPoint(this.points[1])
            .addPoint(this.points[2])
            .addPoint(this.points[0])
            .addPoint(this.points[3])
            .addPoint(this.points[2]);
        this.colorBuf
            .addPoint(this.colors[0])
            .addPoint(this.colors[1])
            .addPoint(this.colors[2])
            .addPoint(this.colors[0])
            .addPoint(this.colors[3])
            .addPoint(this.colors[2]);
        this.positionBuf.updateBuffer();
        this.colorBuf.updateBuffer();
        return [this.positionBuf, this.colorBuf];
    }

    public pointAmount(): number {
        return 6;
    }
}