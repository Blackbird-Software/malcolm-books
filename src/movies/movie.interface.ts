import {GenreInterface} from "../genres/genre.interface";
import {ActorInterface} from "../actors/actor.interface";
import {DirectorInterface} from "../directors/director.interface";

export interface MovieInterface {
    id: string;
    title: string;
    description?: string;
    premiere: string;
    // genres?: GenreInterface[];
    // actors?: ActorInterface[];
    // directors?: DirectorInterface[];
}