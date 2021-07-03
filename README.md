# detect-location-jp

`npm i detect-location-jp`

```
import { detectLocation } from "detect-location-jp";
const location = await detectLocation(text);
```

## `location` のデータ形式

### 都道府県レベルでマッチした場合

```
{
  id: 12345,
  code: 'XX',
  country: '日本',
  country_en: 'Japan',
  country_ja: '日本',
  state: 'ほげ県',
  state_ja: 'ほげ県',
  state_en: 'Hoge Prefecture'
  city: null,
  city_en: null,
  city_ja: null,
  latitude: 100.100,
  longitude: 100.100
}
```

### 市区町村レベルでマッチした場合

```
{
  id: 12345,
  code: 'XX',
  country: '日本',
  country_en: 'Japan',
  country_ja: '日本',
  state: 'ほげ県',
  state_ja: 'ほげ県',
  state_en: 'Hoge Prefecture'
  city: 'ふが市',
  city_en: 'Fuga city',
  city_ja: 'ふが市',
  latitude: 100.111,
  longitude: 100.111
}
```

## 開発方法

- `npm ci`
- `npm test`

## OpenStreetMapからのデータ取得・更新方法

- `npm run job:level4`
  - 日本の都道府県レベルの情報を取得します
  - `./src/data/japan_states.json` が更新されます
- `npm run job:level7`
  - 先に `npm run job:level4` を実行する必要があります
  - 都道府県以下の市区町村レベルの情報を取得します
  - `./src/data/japan_cities.json` が更新されます
