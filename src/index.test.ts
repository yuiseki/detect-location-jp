import { detectLocation } from '.';

describe('都道府県を検出できる', () => {
  it('茨城県', async () => {
    const location = await detectLocation('茨城県で地震が発生しました');
    expect(location).toBe(null);
  });
})