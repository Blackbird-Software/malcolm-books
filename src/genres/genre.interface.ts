import {MovieInterface} from '../movies/movie.interface';

export interface GenreInterface {
    readonly id: string;
    readonly name: string;
    readonly description?: string;
    readonly movies?: MovieInterface[];
}
