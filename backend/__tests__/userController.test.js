import { loginUser, __testExports } from '../controllers/userController.js';
import { jest } from '@jest/globals';

// Mock jwt
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'fake-jwt-token'),
}));

describe('loginUser', () => {
  it('should send a login success response', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock User.findOne
    __testExports.User.findOne = jest.fn().mockResolvedValue({
      _id: 'fakeUserId',
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashedPassword',
      profileImage: '',
      role: 'user',
    });

    // Mock bcrypt.compare
    __testExports.bcrypt.compare = jest.fn().mockResolvedValue(true);

    // Mock generateToken
    __testExports.generateToken = jest.fn().mockReturnValue('fake-jwt-token');

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      token: 'fake-jwt-token',
      user: expect.objectContaining({
        email: 'test@example.com',
      }),
    }));
  }, 10000); // <--- Increase timeout to 10s just in case
});
