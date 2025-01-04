import { HttpError, errorHandler } from '../../middleware/error.middleware';
import { mockRequest, mockResponse, mockNext } from '../helpers/testUtils';

describe('Error Middleware', () => {
  describe('HttpError', () => {
    it('should create an HttpError with status and message', () => {
      const error = new HttpError(404, 'Not Found');
      expect(error.status).toBe(404);
      expect(error.message).toBe('Not Found');
      expect(error instanceof Error).toBe(true);
    });
  });

  describe('errorHandler', () => {
    it('should handle HttpError', () => {
      const error = new HttpError(400, 'Bad Request');
      const req = mockRequest();
      const res = mockResponse();
      const next = mockNext;

      errorHandler(error, req as any, res as any, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: {
          status: 400,
          message: 'Bad Request'
        }
      });
    });

    it('should handle generic Error', () => {
      const error = new Error('Internal Error');
      const req = mockRequest();
      const res = mockResponse();
      const next = mockNext;

      errorHandler(error, req as any, res as any, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: {
          status: 500,
          message: 'Internal Server Error'
        }
      });
    });
  });
});
