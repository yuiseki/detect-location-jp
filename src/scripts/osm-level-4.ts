import fs from 'fs/promises';
import { POI } from '../types/poi';
import { fetchNominatim, fetchOverpass } from './common';

(async () => {
  const result:POI[] = [];
  const overpass_query_level_4 = `
    [out:json][timeout:30000];
    area["name:en"="Japan"];
    relation(area)["admin_level"="4"]["type"="boundary"]["boundary"="administrative"]["name"];
    out tags;`;
  const level4 = await fetchOverpass(overpass_query_level_4);
  for await (const item of level4) {
    const params = new URLSearchParams();
    params.append('state', item.tags.name);
    params.append('format', 'jsonv2');
    const coord = await fetchNominatim(params.toString());
    let state_ja = item.tags.name
    if (item.tags['name:ja'] !== undefined) {
      state_ja = item.tags['name:ja']
    }
    console.log(state_ja);
    result.push({
      id: item.id,
      code: item.tags['ISO3166-2'].split('-')[1],
      country: '日本',
      country_en: 'Japan',
      country_ja: '日本',
      state: item.tags.name,
      state_en: item.tags['name:en'],
      state_ja: state_ja,
      city: null,
      city_en: null,
      city_ja: null,
      latitude: parseFloat(coord[0].lat),
      longitude: parseFloat(coord[0].lon)
    })
  }
  await fs.writeFile('./src/data/japan_states.json', JSON.stringify(result, null, 2))
  await fs.mkdir('./tmp/japan/states', { recursive: true })
})();
