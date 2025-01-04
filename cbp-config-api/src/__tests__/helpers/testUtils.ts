import { Request, Response } from 'express';
import { HttpError } from '../../middleware/error.middleware';

export const mockRequest = (data?: any): Partial<Request> => ({
  body: data?.body || {},
  query: data?.query || {},
  params: data?.params || {},
  headers: data?.headers || {},
  user: data?.user || undefined
});

export const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

export const mockNext = jest.fn();

export const mockHttpError = (statusCode: number, message: string): HttpError => {
  return new HttpError(statusCode, message);
};

export const mockRepository = {
  executeProc: jest.fn(),
  query: jest.fn(),
  transaction: jest.fn()
};

export const mockLogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn()
};
