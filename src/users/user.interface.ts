export interface UserInterface {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    salt: string;

    validatePassword(password: string): Promise<boolean>;
}
