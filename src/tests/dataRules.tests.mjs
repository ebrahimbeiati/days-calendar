import assert from 'assert';
import { getNthWeekdayOfMonth } from '../core/dataRules.mjs';

const ada2024 = getNthWeekdayOfMonth(2024, 9, 2, 2);
assert.strictEqual(ada2024.getUTCFullYear(), 2024);
assert.strictEqual(ada2024.getUTCMonth(), 9);
assert.strictEqual(ada2024.getUTCDate(),8);

const ada2025 = getNthWeekdayOfMonth(2025, 9, 2, 2);
assert.strictEqual(ada2025.getUTCFullYear(), 2025);
assert.strictEqual(ada2025.getUTCMonth(), 9);
assert.strictEqual(ada2025.getUTCDate(), 14);

const lemur2024 = getNthWeekdayOfMonth(2024, 9, 5, "last");
assert.strictEqual(lemur2024.getUTCFullYear(), 2024);
assert.strictEqual(lemur2024.getUTCMonth(), 9);
assert.strictEqual(lemur2024.getUTCDate(), 25);

console.log("All dayRules test Passed!");