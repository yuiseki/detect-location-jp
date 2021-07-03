import fs from 'fs/promises';
import { POI } from '../types/poi';
import { fetchNominatim, fetchOverpass } from './common';

(async () => {
  const result:POI[] = [];
  const overpass_query_level_2 = `
    [out:json][timeout:30000];
    relation["admin_level"="2"]["type"="boundary"]["boundary"="administrative"]["name"];
    out tags;`;
  const level4 = await fetchOverpass(overpass_query_level_2);
  for await (const item of level4) {
    const params = new URLSearchParams();
    params.append('country', item.tags['name:en']);
    params.append('format', 'jsonv2');
    const coord = await fetchNominatim(params.toString());
    if (coord[0] === undefined) {
      continue;
    }
    let country_ja = null;
    if (item.tags['name:ja']) {
      country_ja = item.tags['name:ja']
    } else {
      console.log(item.tags['name:en'], item.tags['name:ja']);
    }
    result.push({
      id: item.id,
      code: item.tags['ISO3166-1'],
      country: item.tags.name,
      country_en: item.tags['name:en'],
      country_ja: country_ja,
      state: null,
      state_en: null,
      state_ja: null,
      city: null,
      city_en: null,
      city_ja: null,
      latitude: coord[0].lat,
      longitude: coord[0].lon
    });
    await fs.mkdir(`./tmp/${item.tags.name_en}/states`, { recursive: true })
  }
  await fs.writeFile('./src/data/countries.json', JSON.stringify(result, null, 2))
})();
