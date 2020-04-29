export interface PasswordHasherInterface {
    hashPassword(password: string, salt: string): Promise<string>;
    generateSalt(): Promise<string>;
}
