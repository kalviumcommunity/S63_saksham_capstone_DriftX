import { jest } from '@jest/globals';
import { getAllProducts } from '../controllers/productController.js';

describe('getAllProducts', () => {
  it('should send a success response', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getAllProducts(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'All Products Fetched' });
  });
});
