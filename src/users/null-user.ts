import {UserInterface} from "./user.interface";

export class NullUser implements  UserInterface {

    email: string;
    firstName: string;
    id: string;
    lastName: string;
    password: string;
    salt: string;

    validatePassword(password: string): Promise<boolean> {
        return Promise.resolve(false);
    }

}