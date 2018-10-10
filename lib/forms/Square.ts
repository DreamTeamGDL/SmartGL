import AbstractPolygon from "./AbstractPolygon";
import GLVector from "../GLVector";
import Point4D from "../Point4D";

export default class Square extends AbstractPolygon {

    protected center: Point4D;
    protected sideLength: number;

    public constructor(center: Point4D, sideLength: number) {
        super();
        this.points.push(new Point4D(center.x + sideLength / 2, center.y + sideLength / 2));
        this.points.push(new Point4D(center.x + sideLength / 2, center.y - sideLength / 2));
        this.points.push(new Point4D(center.x - sideLength / 2, center.y - sideLength / 2));
        this.points.push(new Point4D(center.x - sideLength / 2, center.y + sideLength / 2));
        this.center = center;
        this.sideLength =  sideLength;
    }

    public draw(): GLVector[] {
        throw new Error("Method not implemented.");
    }

}