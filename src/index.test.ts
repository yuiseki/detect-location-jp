import { detectLocation } from '.';

describe('都道府県を検出できる', () => {
  it('茨城県', async () => {
    const location = await detectLocation('茨城県で地震が発生しました');
    if (location === null) {
      throw Error('location is null');
    }
    expect(location.name).toBe('茨城県');
  });
  it('東京都台東区', async () => {
    const location = await detectLocation('東京都台東区で地震が発生しました');
    if (location === null) {
      throw Error('location is null');
    }
    expect(location.state).toBe('東京都');
    expect(location.name).toBe('台東区');
  });
})