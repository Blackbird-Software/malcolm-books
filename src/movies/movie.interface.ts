import {GenreInterface} from '../genres/genre.interface';
import {ActorInterface} from '../actors/actor.interface';
import {DirectorInterface} from '../directors/director.interface';
import {FileInterface} from '../files/file.interface';

export interface MovieInterface {
    readonly id: string;
    readonly title: string;
    readonly description?: string;
    readonly premiere: string;
    readonly country: string;
    readonly genres?: GenreInterface[];
    readonly actors?: ActorInterface[];
    readonly directors?: DirectorInterface[];
    readonly cover: FileInterface;
}
