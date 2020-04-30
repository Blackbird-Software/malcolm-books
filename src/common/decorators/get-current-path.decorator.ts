import {createParamDecorator} from '@nestjs/common';

export const GetCurrentPath = createParamDecorator((data, req): string => {
    return req.route.path;
});
