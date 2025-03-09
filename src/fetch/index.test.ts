import { FETCHER_EXCEPTION_REASON_TYPES } from '@/fetch/enums.ts';
import {
  createFetcher,
  isFetcherException,
  parseJSONResponse,
} from '@/fetch/index.ts';

const generateMockResponse = (status: number, json: object) => ({
  ok: status > 299,
  status,
  json: () => Promise.resolve(json),
});

const testClient = createFetcher({
  url: 'https://test.com',
  timeout: 100,
});

describe('fetch', () => {
  test('handles success case', async () => {
    const mockData = {
      foo: 'bar',
    };

    global.fetch = jest
      .fn()
      .mockResolvedValue(generateMockResponse(200, mockData));

    const result = await testClient('GET', '/');
    const json = await parseJSONResponse(result);

    expect(json).toEqual(mockData);
  });

  test('handles 400 error', async () => {
    const mockData = {
      foo: 'bar',
    };

    global.fetch = jest
      .fn()
      .mockResolvedValue(generateMockResponse(400, mockData));
    try {
      await testClient('GET', '/');
    } catch (e) {
      if (
        isFetcherException(e) &&
        e.detail.reason === FETCHER_EXCEPTION_REASON_TYPES.RESPONSE
      ) {
        const json = await parseJSONResponse(e.detail.response);
        expect(json).toEqual(mockData);
      }
    }
  });

  test('handles timeout error', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(
        () =>
          new Promise(
            (_, reject) =>
              void setTimeout(() => reject(new Error('Timeout')), 150),
          ),
      );
    try {
      await testClient('GET', '/');
    } catch (e) {
      if (isFetcherException(e)) {
        expect(e.detail.reason).toEqual(FETCHER_EXCEPTION_REASON_TYPES.TIMEOUT);
      }
    }
  });
});
