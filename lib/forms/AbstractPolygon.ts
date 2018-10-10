import Point4D from "../Point4D";
import { vec2, mat4 } from "gl-matrix";
import IDrawable from "../interfaces/IDrawable";
import GLVector from "../GLVector";

export default abstract class AbstractPolygon implements IDrawable {

    protected points: Point4D[] = [];
    protected modelMatrix: mat4 = mat4.create();

    public isInside(center: Point4D | vec2): boolean {
        const point: vec2 = center instanceof Point4D ? center.asVec2() : center;
        let angle = 0;
        for (let i = 0; i < this.points.length; i++) {
            const prevPoint = this.points[i].asVec2();
            const currPoint = this.points[(i + 1) % this.points.length].asVec2();
            vec2.subtract(prevPoint, prevPoint, point);
            vec2.subtract(currPoint, currPoint, point);
            angle += vec2.angle(prevPoint, currPoint);
        }
        return angle == 2 * Math.PI;
    }

    public abstract draw(): GLVector[];

    public transform(): mat4 {
        return this.modelMatrix;
    }

}