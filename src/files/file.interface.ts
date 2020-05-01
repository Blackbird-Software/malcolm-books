import {MovieInterface} from '../movies/movie.interface';

export interface FileInterface {
    readonly id: string;
    readonly name: string;
    readonly path: string;
    readonly originalName: string;
    readonly movie?: MovieInterface;
}
