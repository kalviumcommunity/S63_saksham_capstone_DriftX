import { add, multiply } from '../utils/mathUtils.js';

describe('mathUtils', () => {
  it('should correctly add two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should correctly multiply two numbers', () => {
    expect(multiply(4, 5)).toBe(20);
  });
});
