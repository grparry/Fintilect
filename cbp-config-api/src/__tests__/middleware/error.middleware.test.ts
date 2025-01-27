import { Request, Response, NextFunction } from 'express';
import { errorMiddleware } from '@/../middleware/error.middleware';
import { HttpError } from '@/../utils/errors';
import { logger } from '@/../config/logger';

jest.mock('../../config/logger');

describe('Error Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle HttpError', () => {
    const error = new HttpError(400, 'Bad Request');
    
    errorMiddleware(error, mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Bad Request'
    });
  });

  it('should handle invalid page number error', () => {
    const error = new Error('Invalid page number');
    
    errorMiddleware(error, mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Invalid page number'
    });
  });

  it('should handle invalid page size error', () => {
    const error = new Error('Invalid page size');
    
    errorMiddleware(error, mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Invalid page size'
    });
  });

  it('should handle generic errors', () => {
    const error = new Error('Something went wrong');
    
    errorMiddleware(error, mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Internal server error'
    });
  });

  it('should log errors', () => {
    const error = new Error('Test error');
    mockRequest = {
      path: '/test',
      method: 'GET'
    };
    
    errorMiddleware(error, mockRequest as Request, mockResponse as Response, nextFunction);

    expect(logger.error).toHaveBeenCalledWith('Error:', expect.objectContaining({
      message: 'Test error',
      path: '/test',
      method: 'GET'
    }));
  });
});
