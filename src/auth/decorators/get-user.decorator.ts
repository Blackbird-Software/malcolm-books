import { createParamDecorator } from '@nestjs/common';
import {UserInterface} from "../../users/user.interface";

export const GetUser = createParamDecorator((data, req): UserInterface => {
  return req.user;
});
