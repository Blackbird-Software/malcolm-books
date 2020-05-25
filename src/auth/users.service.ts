import {Injectable} from '@nestjs/common';
import axios from "axios";

@Injectable()
export class UsersService {

    private baseUrl = process.env.USERS_URL;

    async checkToken(jwtToken: string): Promise<boolean> {
        const url = `${this.baseUrl}/auth/check`;
        
        return axios({
            method: 'HEAD',
            url: url,
            headers: {
                'Authorization': jwtToken,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.status === 204)
            .catch(() => false);
    }
}
