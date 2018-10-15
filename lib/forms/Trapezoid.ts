import Rectangle from "./Rectangle";
import Point4D from "../Point4D";
import { mat2 } from "gl-matrix";
import { vec2 } from "gl-matrix"

export default class Trapezoid extends Rectangle {
    public constructor(gl: WebGLRenderingContext, center: Point4D, ratio: number, factor: number){
        super(gl, center, ratio);
        this.shearPolygon(factor);
    }

    private shearPolygon(value: number){
        let shearMatrix = mat2.create();
        shearMatrix[2] = value;

        this.points = this.points.map(point => {
            let position = point.asVec2();
            vec2.transformMat2(position, position, shearMatrix);
            return Point4D.fromVec2(position);
        });
    }
}