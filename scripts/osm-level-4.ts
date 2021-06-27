import fs from 'fs/promises';
import { fetchNominatim, fetchOverpass } from './common';

(async () => {
  const result = [];
  const overpass_query_level_4 = `
    [out:json][timeout:30000];
    area["name:en"="Japan"];
    relation(area)["admin_level"="4"]["type"="boundary"]["boundary"="administrative"]["name"];
    out tags;`;
  const level4 = await fetchOverpass(overpass_query_level_4);
  for await (const item of level4) {
    console.log(item.tags.name);
    const params = new URLSearchParams();
    params.append('state', item.tags.name);
    params.append('format', 'jsonv2');
    const coord = await fetchNominatim(params.toString());
    result.push({
      name: item.tags.name,
      latitude: coord[0].lat,
      longitude: coord[0].lon
    })
  }
  await fs.writeFile('./src/data/japan_states.json', JSON.stringify(result, null, 2))
})();
