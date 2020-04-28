export interface UserInterface {
    readonly id: string;
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly password: string;
    readonly salt: string;

    validatePassword(password: string): Promise<boolean>;
}
