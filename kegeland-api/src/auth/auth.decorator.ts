import { createParamDecorator } from '@nestjs/common';

/**
 * Decorator used in authentication module
 */
export const AuthUser = createParamDecorator((data, req) => {
  return req.switchToHttp().getRequest().user.user_id as string;
});
