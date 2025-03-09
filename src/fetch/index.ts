import type { FetcherExceptionReasonTypes } from '@/fetch/enums.ts';
import { FETCHER_EXCEPTION_REASON_TYPES } from '@/fetch/enums.ts';
import { FetcherException } from '@/fetch/exception.ts';
import type { CreateFetcherOptions, Fetcher } from '@/fetch/types.ts';

/**
 * Create a fetcher.
 *
 * @param {CreateFetcherOptions} [options]
 * @param {string} [options.baseUrl]
 * @param {number} [options.timeout=11000]
 * @param {Record<string, string>} [options.headers]
 * @param {any} [options.otherDefaultOptions]
 * @return {Fetcher}
 */
export const createFetcher = ({
  url: baseUrl = '',
  timeout: defaultTimeout = 11000,
  headers: defaultHeaders = {},
  ...otherDefaultOptions
}: CreateFetcherOptions): Fetcher => {
  return async (
    method,
    url,
    { timeout, signal, headers, ...otherOptions } = {},
  ) => {
    let exceptionReason:
      | Exclude<
          FetcherExceptionReasonTypes,
          | typeof FETCHER_EXCEPTION_REASON_TYPES.RESPONSE
          | typeof FETCHER_EXCEPTION_REASON_TYPES.NETWORK
        >
      | undefined;
    let response: Response;

    try {
      const mainAbortController = new AbortController();
      const timeoutSignal = AbortSignal.timeout(timeout ?? defaultTimeout);

      timeoutSignal.addEventListener('abort', () => {
        exceptionReason = FETCHER_EXCEPTION_REASON_TYPES.TIMEOUT;
        mainAbortController.abort();
      });
      signal?.addEventListener('abort', () => {
        exceptionReason = FETCHER_EXCEPTION_REASON_TYPES.ABORT;
        mainAbortController.abort();
      });

      response = await fetch(`${baseUrl}${url}`, {
        ...otherDefaultOptions,
        ...otherOptions,
        headers: {
          ...defaultHeaders,
          ...headers,
        },
        method,
        signal: mainAbortController.signal,
      });
    } catch (e) {
      throw new FetcherException({
        reason: exceptionReason ?? FETCHER_EXCEPTION_REASON_TYPES.NETWORK,
        exception: e,
      });
    }

    if (response.status >= 400) {
      throw new FetcherException({
        reason: FETCHER_EXCEPTION_REASON_TYPES.RESPONSE,
        status: response.status,
        response: response,
      });
    }

    return response;
  };
};

/**
 * Parses a JSON response from a fetch request.
 *
 * @template T
 * @param {Response} res - The response object to parse.
 * @returns {Promise<T>} - A promise that resolves to the parsed JSON object.
 */
export const parseJSONResponse = async <T extends object>(res: Response) => {
  return (await res.json()) as Promise<T>;
};

/**
 * Check if a value is an instance of FetcherException.
 *
 * @param {unknown} e the value to check
 * @returns {e is FetcherException} true if the value is a FetcherException
 */
export const isFetcherException = (e: unknown): e is FetcherException => {
  return e instanceof FetcherException;
};
