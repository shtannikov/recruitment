import {describe, test} from '@jest/globals';
import { DateCalculator } from '../src/utils/DateCalculator';

describe('date calculator', () => {
    test('get difference, date2 > date1, absolute result', () => {
        const date2 = new Date(2020, 6, 15);
        const date1 = new Date(2020, 6, 1);
        
        const result = new DateCalculator().getDifferenceInDays(date1, date2);

        expect(result).toBe(14);
    });

    test('get difference, date1 > date2, absolute result', () => {
        const date2 = new Date(2020, 6, 3);
        const date1 = new Date(2020, 6, 13);

        const result = new DateCalculator().getDifferenceInDays(date1, date2);

        expect(result).toBe(10);
    });

    test('get difference, return only whole days difference', () => {
        const date1 = new Date(2020, 6, 15, 23, 59);
        const date2 = new Date(2020, 6, 14, 0, 0);

        const result = new DateCalculator().getDifferenceInDays(date1, date2);

        expect(result).toBe(1);
    });
});