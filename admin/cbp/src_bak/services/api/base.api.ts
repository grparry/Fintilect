import { API_BASE_URL } from '../../config/api.config';

interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
}

export class BaseApi {
  protected baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',





      'Content-Type': 'application/json',




    
      ...requestConfig,
        ...this.getHeaders(),
        ...requestConfig.headers,




      ...config,

      ...config,


      ...config,

    
      ...requestConfig,
        ...this.getHeaders(),
        ...requestConfig.headers,


