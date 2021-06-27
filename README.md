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
  name: 'ほげ県',
  lat: 100.100,
  lon: 100.100
}
```

### 市区町村レベルでマッチした場合

```
{
  name: 'ふが市',
  state: 'ほげ県',
  lat: 100.111,
  lon: 100.111
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
