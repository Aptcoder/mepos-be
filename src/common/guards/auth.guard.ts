import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import * as config from 'config';
import { Reflector } from '@nestjs/core';
import { Permission, checkRequiredPermission } from './permission.helper';

@Injectable()
export class AuthGuard implements CanActivate {
  // constructor(private readonly u: InternalCacheService) {}
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const Authorization = request.get('Authorization');
    if (!Authorization) {
      throw new UnauthorizedException('Unauthorized request');
    }
    const token = Authorization.split(' ');
    if (!((token[1] && token[0] === 'Bearer') || token[0] === 'bearer')) {
      throw new UnauthorizedException('Unauthorized request');
    }

    let decrypt;
    try {
      const jwt_secret = config.get<string>('jwt_secret');
      decrypt = await verify(token[1], jwt_secret);
    } catch (e) {
      throw new UnauthorizedException('Unauthorized request');
    }

    if (!decrypt) {
      throw new UnauthorizedException('Unauthorized request');
    }

    request.userId = decrypt.sub;
    request.userRole = decrypt.role as {
      permissions: string[];
    };

    const permission = this.reflector.get(Permission, context.getHandler());
    if (!permission) {
      return true;
    }
    const isAllowed = checkRequiredPermission(
      permission,
      request.userRole.permissions,
    );
    if (!isAllowed) {
      throw new UnauthorizedException(
        'User does not have right permissions for this action',
      );
    }
    // request.token = token[1];
    return true;
  }
}
