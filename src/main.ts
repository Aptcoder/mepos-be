import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionsFilter } from './common/exceptions/http-filter.exception';
import { RoleService } from './role/role.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionsFilter());

  const roleService = app.get(RoleService );
  await roleService.createDefaultRoles

  await app.listen(3000);
}
bootstrap();
