import type {
  FETCHER_EXCEPTION_REASON_TYPES,
  FetcherExceptionReasonTypes,
} from '@/fetch/enums.ts';

type Detail =
  | {
      reason: typeof FETCHER_EXCEPTION_REASON_TYPES.RESPONSE;
      status: number;
      response: Response;
    }
  | {
      reason: Exclude<
        FetcherExceptionReasonTypes,
        typeof FETCHER_EXCEPTION_REASON_TYPES.RESPONSE
      >;
      exception: unknown;
    };

export class FetcherException extends Error {
  public detail: Detail;

  constructor(detail: Detail) {
    super('Fetch Error');
    this.name = 'FetcherException';
    this.detail = detail;
  }
}
