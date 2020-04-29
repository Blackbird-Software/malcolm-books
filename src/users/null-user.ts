import {UserInterface} from './user.interface';

export class NullUser implements UserInterface {

    readonly email: string;
    readonly firstName: string;
    readonly id: string;
    readonly lastName: string;
    readonly password: string;
    readonly salt: string;

    validatePassword(password: string): Promise<boolean> {
        return Promise.resolve(false);
    }

}
