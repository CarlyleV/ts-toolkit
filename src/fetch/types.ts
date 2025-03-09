export type FetcherHttpMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';

export type CreateFetcherOptions = {
  url?: string;
  timeout?: number;
} & Omit<RequestInit, 'method' | 'signal'>;

export type FetcherOptions = Omit<RequestInit, 'method'> & {
  timeout?: number;
};

export type Fetcher = (
  method: FetcherHttpMethod,
  url: string,
  options?: FetcherOptions,
) => Promise<Response>;
