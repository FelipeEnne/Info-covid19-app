import fetchSummary from '../../actions/fechSummary';

const validSummary = {
  Global: {
    NewConfirmed: 1,
    TotalConfirmed: 2,
    NewDeaths: 3,
    TotalDeaths: 4,
    NewRecovered: 5,
    TotalRecovered: 6,
  },
  Countries: [{
    Country: 'Brazil',
    NewConfirmed: 1,
    TotalConfirmed: 2,
    NewDeaths: 3,
    TotalDeaths: 4,
    NewRecovered: 5,
    TotalRecovered: 6,
  }],
  Date: '2020-06-08T18:20:35Z',
};

describe('fetchSummary', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('dispatches loading then a valid summary', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(validSummary),
    }));
    const dispatch = vi.fn();

    await fetchSummary()(dispatch);

    expect(dispatch.mock.calls.map(([action]) => action.type)).toEqual([
      'FETCH_PRODUCTS_LOADING',
      'FETCH_PRODUCTS_SUCCESS',
    ]);
    expect(dispatch.mock.calls[1][0].resp).toBe(validSummary);
  });

  it('dispatches an error for a failed HTTP response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }));
    const dispatch = vi.fn();

    await fetchSummary()(dispatch);

    expect(dispatch.mock.calls.map(([action]) => action.type)).toEqual([
      'FETCH_PRODUCTS_LOADING',
      'FETCH_PRODUCTS_ERROR',
    ]);
  });

  it('rejects a successful response with an invalid shape', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        Global: {},
        Countries: [null],
        Date: 'today',
      }),
    }));
    const dispatch = vi.fn();

    await fetchSummary()(dispatch);

    expect(dispatch.mock.calls.map(([action]) => action.type)).toEqual([
      'FETCH_PRODUCTS_LOADING',
      'FETCH_PRODUCTS_ERROR',
    ]);
  });
});
