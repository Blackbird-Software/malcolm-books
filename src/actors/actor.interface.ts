import {Gender} from "../common/gender.enum";

export interface ActorInterface {
    id: string;
    firstName: string;
    lastName: string;
    gender: Gender;
}