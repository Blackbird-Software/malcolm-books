import {Gender} from '../common/gender.enum';

export interface ActorInterface {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly gender: Gender;
}
