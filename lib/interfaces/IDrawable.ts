import GLVector from "../GLVector";
import { mat4 } from "gl-matrix";

export default interface IDrawable {
    vectors: GLVector[];
    count: number;
}