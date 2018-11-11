
import GLVector from "../GLVector";


export default interface IDrawable {
    vectors: GLVector[];
    count: number;
    scale(x: number, y: number): void;
    rotate(angle: number): void;
    translate(x: number, y: number, z: number, moveTo: boolean): void;
}