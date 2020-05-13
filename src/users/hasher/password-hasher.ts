import * as bcrypt from 'bcryptjs';
import {PasswordHasherInterface} from './password-hasher.interface';

export class PasswordHasher implements PasswordHasherInterface {
    public async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    public async generateSalt(): Promise<string> {
        return bcrypt.genSalt();
    }
}
