import fs from 'fs/promises';
import { fetchNominatim, fetchOverpass } from './common';
import states from '../src/data/japan_states.json';

(async () => {
  const result = [];
  for await (const state of states) {
    console.log(state.name);
    const overpass_query_level_7 = `
      [out:json][timeout:30000];
      area["name:ja"="${state.name}"];
      relation(area)["admin_level"="7"]["type"="boundary"]["boundary"="administrative"]["name"];
      out tags;`;
    const level7 = await fetchOverpass(overpass_query_level_7);
    for await (const item of level7) {
      console.log(state.name, item.tags.name)
      const params = new URLSearchParams();
      params.append('state', state.name);
      params.append('city', item.tags.name);
      params.append('format', 'jsonv2');
      const coord = await fetchNominatim(params.toString());
      result.push({
        name: item.tags.name,
        state: state.name,
        latitude: coord[0].lat,
        longitude: coord[0].lon
      })
    }
  }
  await fs.writeFile('./src/data/japan_cities.json', JSON.stringify(result, null, 2))
})();
