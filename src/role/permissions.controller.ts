import { Controller, Get } from '@nestjs/common';
import { permissions } from './permissions-data';
import { HttpResponseHelper } from 'src/common/helper/http-response.helper';

@Controller('permissions')
export class PermissionController {
  constructor() {}

  @Get()
  async findAll() {
    return HttpResponseHelper.send('Permissions', permissions);
  }
}
