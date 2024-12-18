import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionsFilter } from './common/exceptions/http-filter.exception';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { engine } from 'express-handlebars';
import { TranslationService } from './translation/translation.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  // const i18n = app.get(TranslationService);

  // app.engine(
  //   'hbs',
  //   engine({
  //     helpers: {
  //       t: (key: string) => i18n.translate(key),
  //     },
  //   }),
  // );

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionsFilter());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.useLogger(app.get(Logger));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
