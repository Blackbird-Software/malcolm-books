import {MovieInterface} from '../movies/movie.interface';

export interface DirectorInterface {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly movies?: MovieInterface[];
}
