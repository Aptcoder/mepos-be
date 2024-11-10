import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { ObjectId } from 'mongodb';

@Injectable()
export class TranslationService {
  constructor(private readonly i18n: I18nService) {}

  async translate(word: string) {
    return this.i18n.translate(word);
  }

  async translateKeysAndValues(data: any, lang: string = 'en'): Promise<any> {
    if (Array.isArray(data)) {
      // If it's an array, map through each element and recursively translate
      return Promise.all(
        data.map((item) => this.translateKeysAndValues(item, lang)),
      );
    }
    if (typeof data === 'object' && data !== null) {
      const translatedData = {};
      for (const key in data) {
        const translatedKey: string = await this.i18n.translate(
          `translations.${key}`,
          {
            lang,
            defaultValue: key,
          },
        );

        if (data[key] instanceof ObjectId || data[key] instanceof Date) {
          // If the value is a MongoDB ObjectId, keep it as a string
          translatedData[translatedKey] = data[key];
        } else {
          // Translate the value
          const translatedValue: string = await this.translateKeysAndValues(
            data[key],
            lang,
          );

          translatedData[translatedKey] = translatedValue;
        }
      }

      return translatedData;
    }

    if (typeof data === 'string') {
      return await this.i18n.translate(data, { lang, defaultValue: data });
    }

    return data;
  }
}
