import {Gender} from '../common/gender.enum';
import {MovieInterface} from "../movies/movie.interface";

export interface ActorInterface {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly gender: Gender;
    readonly movies?: MovieInterface[];
}
