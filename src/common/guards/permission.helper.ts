import { Reflector } from '@nestjs/core';

export const Permission = Reflector.createDecorator<string>();

export const checkRequiredPermission = (
  permission: string,
  userPermissions: string[],
) => {
  const split = permission.split('-');
  const lastIndex = split.length - 1;
  split[lastIndex] = '*';
  const allCase = split.join('-');

  if (
    userPermissions.includes(permission) ||
    userPermissions.includes(allCase)
  ) {
    return true;
  }
  return false;
};
