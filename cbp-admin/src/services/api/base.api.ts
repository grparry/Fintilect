import { API_BASE_URL } from '@api/../config/api.config';

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
    };

    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private buildUrl(path: string, params?: Record<string, string>): string {
    const url = new URL(path, this.baseURL);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    return url.toString();
  }

  protected async request<T>(path: string, config: RequestConfig = {}): Promise<T> {
    const { params, ...requestConfig } = config;
    const url = this.buildUrl(path, params);
    
    const response = await fetch(url, {
      ...requestConfig,
      headers: {
        ...this.getHeaders(),
        ...requestConfig.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  protected async get<T>(path: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(path, { ...config, method: 'GET' });
  }

  protected async post<T>(path: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(path, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  protected async put<T>(path: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(path, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  protected async delete<T>(path: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(path, { ...config, method: 'DELETE' });
  }

  protected async patch<T>(path: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(path, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  protected async getBlob(path: string, config: RequestConfig = {}): Promise<Blob> {
    const { params, ...requestConfig } = config;
    const url = this.buildUrl(path, params);
    
    const response = await fetch(url, {
      ...requestConfig,
      headers: {
        ...this.getHeaders(),
        ...requestConfig.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.blob();
  }
}
