import { Role } from '../interfaces/role.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
      const request = context.switchToHttp().getRequest<any>();
      const user = request.user.payload;
      return user?.role.includes(role);
    }
  }
  return mixin(RoleGuardMixin);
};

export default RoleGuard;
