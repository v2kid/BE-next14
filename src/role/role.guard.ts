import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext):  Promise<boolean>  {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const [type, token] = (request.headers.authorization || '').split(' ');
    try {
        const decodedToken = this.jwtService.verify(token);
        const user = decodedToken; // Adjust this based on your token structure
        return requiredRoles.some((role) => user.user.roles.includes(role));
      } catch (error) {
        return false; // Token is invalid or expired
      }
  
  }

}


