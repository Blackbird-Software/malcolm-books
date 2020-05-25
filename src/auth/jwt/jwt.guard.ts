import {ExecutionContext, Inject, Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {UsersService} from "../users.service";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(@Inject('UsersService') private readonly usersService: UsersService) {
        super();
    }

    canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const jwtToken = req.header('Authorization');

        return this.usersService.checkToken(jwtToken);
    }
}
