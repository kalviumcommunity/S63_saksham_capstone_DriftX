import generateToken from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';

process.env.JWT_SECRET = 'testsecret';

describe('generateToken', () => {
  it('should generate a valid JWT token', () => {
    const userId = '123abc';
    const token = generateToken(userId);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    expect(decoded).toHaveProperty('id', userId);
    expect(decoded).toHaveProperty('iat');
    expect(decoded).toHaveProperty('exp');
  });
});
