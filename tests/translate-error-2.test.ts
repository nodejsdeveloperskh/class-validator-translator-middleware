import { Equals, IsOptional, validate } from 'class-validator';

import { translateErrors } from '../src/translate-errors';
import { Locale } from '../src/contracts/enums/locales.enum';

const persianMessages = {
    title1_should_be_sample: 'تست خوبه',
    title2_should_be_sample: 'تست خیلی خوبه',
};

class TestClassValidator {
    @IsOptional()
    @Equals('sample', { message: 'title1_should_be_sample' })
    title1: string = 'bad_value';

    @IsOptional()
    @Equals('sample', { message: 'title2_should_be_sample' })
    title2: string = 'bad_value';
}

const testClassValidator = new TestClassValidator();

test('Translation should be done for persian for two errors', async () => {
    const errors = await validate(testClassValidator);
    const translatedErrors = await translateErrors(
        errors,
        persianMessages,
        Locale.fa,
    );

    expect(translatedErrors[0].constraints!).toBe(
        persianMessages.title1_should_be_sample,
    );
    expect(translatedErrors[1].constraints!).toBe(
        persianMessages.title2_should_be_sample,
    );
});
