import { capitalize } from '../utils/stringUtils.js';

describe('capitalize', () => {
  it('should capitalize the first letter', () => {
    expect(capitalize('driftx')).toBe('Driftx');
  });

  it('should return empty string if input is empty', () => {
    expect(capitalize('')).toBe('');
  });
});
