import {JwtResponseInterface} from './jwt-response.interface';

export class JwtResponse implements JwtResponseInterface {

    accessToken: string;
    expiresAt: Date;

    constructor(accessToken: string, expiresIn: number) {
        const today = new Date();
        today.setSeconds(today.getSeconds() + expiresIn);

        this.accessToken = accessToken;
        this.expiresAt = today;
    }
}
