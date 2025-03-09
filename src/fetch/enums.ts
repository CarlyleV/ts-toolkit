export const FETCHER_EXCEPTION_REASON_TYPES = {
  TIMEOUT: '0',
  ABORT: '1',
  RESPONSE: '2',
  NETWORK: '3',
} as const;

export type FetcherExceptionReasonTypes =
  (typeof FETCHER_EXCEPTION_REASON_TYPES)[keyof typeof FETCHER_EXCEPTION_REASON_TYPES];
