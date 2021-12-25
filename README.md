# class-validator-translator-middleware

You can simply install it and then use it.

## How to use this package

-   first install it `npm i class-validator-translator-middleware`
-   Examples:

    -   Here is one example in ExpressJS:

        ```ts
        import {
            translateErrors,
            Locale,
            Messages,
            ClassValidatorTranslatorMiddleware,
        } from 'class-validator-translator-middleware';

        // If one message does not exists class-validator-translator-middleware will translate it
        // with google translator
        const sampleMessages: Messages = {
            [Locale.en]: {
                title_should_be_sample: 'sample is good',
            },
            [Locale.fa]: {
                title_should_be_sample: 'تست خوبه',
            },
        };
        const classValidatorTranslatorMiddleware =
            new ClassValidatorTranslatorMiddleware(
                sampleMessages,
                Locale.fa,
            );

        app.use(classValidatorTranslatorMiddleware.middleware);

        // this can be your class validator
        class TestClassValidator {
            @IsOptional()
            @Equals('sample', { message: 'title_should_be_sample' })
            title: string = 'bad_value';
        }

        app.use((error, req, res, next) => {
            for (const error of errors) {
                console.log(error.constraints); // تست خوبه
            }
        });
        ```

    -   Here is one example in routing controller

        ```ts
        // messages.ts

        import {
            Locale,
            Messages,
        } from 'class-validator-translator-middleware';

        export const classValidatorMessages: Messages = {
            [Locale.en]: {
                serviced_should_be_boolean_not_empty:
                    'serviced should be boolean, not empty string',
            },
            [Locale.fa]: {
                serviced_should_be_boolean_not_empty:
                    'لطفا فیلتر شهر های تحت پوشش را خالی وارد نکنید',
            },
        };

        // city-filter.ts
        import {
            IsBoolean,
            IsAlpha,
            IsNotEmpty,
            IsOptional,
            IsString,
        } from 'class-validator';

        export class CityFilterQuery {
            @IsOptional()
            @IsAlpha('en', {
                message: 'serviced_should_be_boolean_not_empty',
            })
            @IsBoolean({ message: 'serviced_should_be_boolean' })
            serviced?: boolean;
        }

        // class-validator-error-translator.middleware.ts
        import { ValidationError } from 'class-validator';
        import {
            Middleware,
            ExpressErrorMiddlewareInterface,
            HttpError,
        } from 'routing-controllers';
        import { NextFunction, Request, Response } from 'express';
        import {
            ClassValidatorTranslatorMiddleware,
            Locale,
        } from 'class-validator-translator-middleware';

        import { classValidatorMessages } from '../contracts/models/class-validator-messages.mode';

        const classValidatorTranslatorMiddleware =
            new ClassValidatorTranslatorMiddleware(
                classValidatorMessages,
                Locale.fa,
            );

        class CustomValidationError {
            errors: ValidationError[];
            status?: number;
            statusCode?: number;
        }

        @Middleware({ type: 'after' })
        export class ClassValidatorErrorTranslator
            implements ExpressErrorMiddlewareInterface
        {
            error(
                error: HttpError | CustomValidationError,
                request: Request,
                response: Response,
                next: NextFunction,
            ): void {
                classValidatorTranslatorMiddleware.middleware(
                    error,
                    request,
                    response,
                    next,
                );
            }
        }

        // app.ts
        import { ClassValidatorErrorTranslator } from './middlewares/class-validator-error-translator.middleware';
        import express from 'express';

        const app = express();

        const routingControllersOptions: RoutingControllersOptions = {
            controllers: [
                /* controllers */
            ],
            middlewares: [ClassValidatorErrorTranslator],
            /* other configs */
            validation: {
                whitelist: true,
            },
        };
        useExpressServer(app, routingControllersOptions);
        ```

### Supported languages in `Locale` enum

<table cellpadding="0" cellspacing="0" border="1">
    <caption><span class="tablecap">Table 1. Language Codes</span></caption>
    <thead align="left">
        <tr>
            <th class="" id="d7162e57">Language</th>
            <th class="" id="d7162e60">Code</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Abkhazian</td>
            <td class="" headers="d7162e57 d7162e60">AB</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Afar</td>
            <td class="" headers="d7162e57 d7162e60">AA</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Afrikaans</td>
            <td class="" headers="d7162e57 d7162e60">AF</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Albanian</td>
            <td class="" headers="d7162e57 d7162e60">SQ</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Amharic</td>
            <td class="" headers="d7162e57 d7162e60">AM</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Arabic</td>
            <td class="" headers="d7162e57 d7162e60">AR</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Armenian</td>
            <td class="" headers="d7162e57 d7162e60">HY</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Assamese</td>
            <td class="" headers="d7162e57 d7162e60">AS</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Aymara</td>
            <td class="" headers="d7162e57 d7162e60">AY</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Azerbaijani</td>
            <td class="" headers="d7162e57 d7162e60">AZ</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Bashkir</td>
            <td class="" headers="d7162e57 d7162e60">BA</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Basque</td>
            <td class="" headers="d7162e57 d7162e60">EU</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Bengali, Bangla</td>
            <td class="" headers="d7162e57 d7162e60">BN</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Bhutani</td>
            <td class="" headers="d7162e57 d7162e60">DZ</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Bihari</td>
            <td class="" headers="d7162e57 d7162e60">BH</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Bislama</td>
            <td class="" headers="d7162e57 d7162e60">BI</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Breton</td>
            <td class="" headers="d7162e57 d7162e60">BR</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Bulgarian</td>
            <td class="" headers="d7162e57 d7162e60">BG</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Burmese</td>
            <td class="" headers="d7162e57 d7162e60">MY</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Byelorussian</td>
            <td class="" headers="d7162e57 d7162e60">BE</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Cambodian</td>
            <td class="" headers="d7162e57 d7162e60">KM</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Catalan</td>
            <td class="" headers="d7162e57 d7162e60">CA</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Chinese</td>
            <td class="" headers="d7162e57 d7162e60">ZH</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Corsican</td>
            <td class="" headers="d7162e57 d7162e60">CO</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Croatian</td>
            <td class="" headers="d7162e57 d7162e60">HR</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Czech</td>
            <td class="" headers="d7162e57 d7162e60">CS</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Danish</td>
            <td class="" headers="d7162e57 d7162e60">DA</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Dutch</td>
            <td class="" headers="d7162e57 d7162e60">NL</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">English, American</td>
            <td class="" headers="d7162e57 d7162e60">EN</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Esperanto</td>
            <td class="" headers="d7162e57 d7162e60">EO</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Estonian</td>
            <td class="" headers="d7162e57 d7162e60">ET</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Faeroese</td>
            <td class="" headers="d7162e57 d7162e60">FO</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Fiji</td>
            <td class="" headers="d7162e57 d7162e60">FJ</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Finnish</td>
            <td class="" headers="d7162e57 d7162e60">FI</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">French</td>
            <td class="" headers="d7162e57 d7162e60">FR</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Frisian</td>
            <td class="" headers="d7162e57 d7162e60">FY</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Gaelic (Scots Gaelic)</td>
            <td class="" headers="d7162e57 d7162e60">GD</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Galician</td>
            <td class="" headers="d7162e57 d7162e60">GL</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Georgian</td>
            <td class="" headers="d7162e57 d7162e60">KA</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">German</td>
            <td class="" headers="d7162e57 d7162e60">DE</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Greek</td>
            <td class="" headers="d7162e57 d7162e60">EL</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Greenlandic</td>
            <td class="" headers="d7162e57 d7162e60">KL</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Guarani</td>
            <td class="" headers="d7162e57 d7162e60">GN</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Gujarati</td>
            <td class="" headers="d7162e57 d7162e60">GU</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Hausa</td>
            <td class="" headers="d7162e57 d7162e60">HA</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Hebrew</td>
            <td class="" headers="d7162e57 d7162e60">IW</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Hindi</td>
            <td class="" headers="d7162e57 d7162e60">HI</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Hungarian</td>
            <td class="" headers="d7162e57 d7162e60">HU</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Icelandic</td>
            <td class="" headers="d7162e57 d7162e60">IS</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Indonesian</td>
            <td class="" headers="d7162e57 d7162e60">IN</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Interlingua</td>
            <td class="" headers="d7162e57 d7162e60">IA</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Interlingue</td>
            <td class="" headers="d7162e57 d7162e60">IE</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Inupiak</td>
            <td class="" headers="d7162e57 d7162e60">IK</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Irish</td>
            <td class="" headers="d7162e57 d7162e60">GA</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Italian</td>
            <td class="" headers="d7162e57 d7162e60">IT</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Japanese</td>
            <td class="" headers="d7162e57 d7162e60">JA</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Javanese</td>
            <td class="" headers="d7162e57 d7162e60">JW</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Kannada</td>
            <td class="" headers="d7162e57 d7162e60">KN</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Kashmiri</td>
            <td class="" headers="d7162e57 d7162e60">KS</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Kazakh</td>
            <td class="" headers="d7162e57 d7162e60">KK</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Kinyarwanda</td>
            <td class="" headers="d7162e57 d7162e60">RW</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Kirghiz</td>
            <td class="" headers="d7162e57 d7162e60">KY</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Kirundi</td>
            <td class="" headers="d7162e57 d7162e60">RN</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Korean</td>
            <td class="" headers="d7162e57 d7162e60">KO</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Kurdish</td>
            <td class="" headers="d7162e57 d7162e60">KU</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Laothian</td>
            <td class="" headers="d7162e57 d7162e60">LO</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Latin</td>
            <td class="" headers="d7162e57 d7162e60">LA</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Latvian, Lettish</td>
            <td class="" headers="d7162e57 d7162e60">LV</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Lingala</td>
            <td class="" headers="d7162e57 d7162e60">LN</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Lithuanian</td>
            <td class="" headers="d7162e57 d7162e60">LT</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Macedonian</td>
            <td class="" headers="d7162e57 d7162e60">MK</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Malagasy</td>
            <td class="" headers="d7162e57 d7162e60">MG</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Malay</td>
            <td class="" headers="d7162e57 d7162e60">MS</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Malayalam</td>
            <td class="" headers="d7162e57 d7162e60">ML</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Maltese</td>
            <td class="" headers="d7162e57 d7162e60">MT</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Maori</td>
            <td class="" headers="d7162e57 d7162e60">MI</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Marathi</td>
            <td class="" headers="d7162e57 d7162e60">MR</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Moldavian</td>
            <td class="" headers="d7162e57 d7162e60">MO</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Mongolian</td>
            <td class="" headers="d7162e57 d7162e60">MN</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Nauru</td>
            <td class="" headers="d7162e57 d7162e60">NA</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Nepali</td>
            <td class="" headers="d7162e57 d7162e60">NE</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Norwegian</td>
            <td class="" headers="d7162e57 d7162e60">NO</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Occitan</td>
            <td class="" headers="d7162e57 d7162e60">OC</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Oriya</td>
            <td class="" headers="d7162e57 d7162e60">OR</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Oromo, Afan</td>
            <td class="" headers="d7162e57 d7162e60">OM</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Pashto, Pushto</td>
            <td class="" headers="d7162e57 d7162e60">PS</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Persian</td>
            <td class="" headers="d7162e57 d7162e60">FA</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Polish</td>
            <td class="" headers="d7162e57 d7162e60">PL</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Portuguese</td>
            <td class="" headers="d7162e57 d7162e60">PT</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Punjabi</td>
            <td class="" headers="d7162e57 d7162e60">PA</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Quechua</td>
            <td class="" headers="d7162e57 d7162e60">QU</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Rhaeto-Romance</td>
            <td class="" headers="d7162e57 d7162e60">RM</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Romanian</td>
            <td class="" headers="d7162e57 d7162e60">RO</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Russian</td>
            <td class="" headers="d7162e57 d7162e60">RU</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Samoan</td>
            <td class="" headers="d7162e57 d7162e60">SM</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Sangro</td>
            <td class="" headers="d7162e57 d7162e60">SG</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Sanskrit</td>
            <td class="" headers="d7162e57 d7162e60">SA</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Serbian</td>
            <td class="" headers="d7162e57 d7162e60">SR</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Serbo-Croatian</td>
            <td class="" headers="d7162e57 d7162e60">SH</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Sesotho</td>
            <td class="" headers="d7162e57 d7162e60">ST</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Setswana</td>
            <td class="" headers="d7162e57 d7162e60">TN</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Shona</td>
            <td class="" headers="d7162e57 d7162e60">SN</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Sindhi</td>
            <td class="" headers="d7162e57 d7162e60">SD</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Singhalese</td>
            <td class="" headers="d7162e57 d7162e60">SI</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Siswati</td>
            <td class="" headers="d7162e57 d7162e60">SS</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Slovak</td>
            <td class="" headers="d7162e57 d7162e60">SK</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Slovenian</td>
            <td class="" headers="d7162e57 d7162e60">SL</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Somali</td>
            <td class="" headers="d7162e57 d7162e60">SO</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Spanish</td>
            <td class="" headers="d7162e57 d7162e60">ES</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Sudanese</td>
            <td class="" headers="d7162e57 d7162e60">SU</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Swahili</td>
            <td class="" headers="d7162e57 d7162e60">SW</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Swedish</td>
            <td class="" headers="d7162e57 d7162e60">SV</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Tagalog</td>
            <td class="" headers="d7162e57 d7162e60">TL</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Tajik</td>
            <td class="" headers="d7162e57 d7162e60">TG</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Tamil</td>
            <td class="" headers="d7162e57 d7162e60">TA</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Tatar</td>
            <td class="" headers="d7162e57 d7162e60">TT</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Tegulu</td>
            <td class="" headers="d7162e57 d7162e60">TE</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Thai</td>
            <td class="" headers="d7162e57 d7162e60">TH</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Tibetan</td>
            <td class="" headers="d7162e57 d7162e60">BO</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Tigrinya</td>
            <td class="" headers="d7162e57 d7162e60">TI</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Tonga</td>
            <td class="" headers="d7162e57 d7162e60">TO</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Tsonga</td>
            <td class="" headers="d7162e57 d7162e60">TS</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Turkish</td>
            <td class="" headers="d7162e57 d7162e60">TR</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Turkmen</td>
            <td class="" headers="d7162e57 d7162e60">TK</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Twi</td>
            <td class="" headers="d7162e57 d7162e60">TW</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Ukrainian</td>
            <td class="" headers="d7162e57 d7162e60">UK</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Urdu</td>
            <td class="" headers="d7162e57 d7162e60">UR</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Uzbek</td>
            <td class="" headers="d7162e57 d7162e60">UZ</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Vietnamese</td>
            <td class="" headers="d7162e57 d7162e60">VI</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Volapuk</td>
            <td class="" headers="d7162e57 d7162e60">VO</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Welsh</td>
            <td class="" headers="d7162e57 d7162e60">CY</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Wolof</td>
            <td class="" headers="d7162e57 d7162e60">WO</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Xhosa</td>
            <td class="" headers="d7162e57 d7162e60">XH</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Yiddish</td>
            <td class="" headers="d7162e57 d7162e60">JI</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Yoruba</td>
            <td class="" headers="d7162e57 d7162e60">YO</td>
        </tr>
        <tr>
            <td class="" headers="d7162e57 d7162e60">Zulu</td>
            <td class="" headers="d7162e57 d7162e60">ZU</td>
        </tr>
    </tbody>
</table>

### Notes

-   I had no time to add all the languages in the Locale
-   Please use it with Typescript to prevent any unexpected behaviours
-   Feel free to create issue or pull request

## Contribution

-   Write you code
-   Write its tests in tests directory
-   run `npm test` and make sure it works perfectly
