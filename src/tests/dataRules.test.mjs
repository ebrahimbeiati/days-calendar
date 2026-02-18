
import { getNthWeekdayOfMonth } from '../core/dataRules.mjs';

describe('dayRules tests', () => {
  test('ADA 2024', () => {
    const ada2024 = getNthWeekdayOfMonth(2024, 9, 2, 2);
    expect(ada2024.getUTCFullYear()).toBe(2024);
    expect(ada2024.getUTCMonth()).toBe(9);
    expect(ada2024.getUTCDate()).toBe(8);
  });

  test('ADA 2025', () => {
    const ada2025 = getNthWeekdayOfMonth(2025, 9, 2, 2);
    expect(ada2025.getUTCFullYear()).toBe(2025);
    expect(ada2025.getUTCMonth()).toBe(9);
    expect(ada2025.getUTCDate()).toBe(14);
  });

  test('Lemur 2024', () => {
    const lemur2024 = getNthWeekdayOfMonth(2024, 9, 5, 'last');
    expect(lemur2024.getUTCFullYear()).toBe(2024);
    expect(lemur2024.getUTCMonth()).toBe(9);
    expect(lemur2024.getUTCDate()).toBe(25);
  });
});