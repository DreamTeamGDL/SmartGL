
import GLVector from "../GLVector";
import { mat4 } from "gl-matrix";

export default interface IDrawable {
    vectors: GLVector[];
    count: number;
    scale(x: number, y: number): void;
    rotate(angle: number): void;
    translate(x: number, y: number): void;
}