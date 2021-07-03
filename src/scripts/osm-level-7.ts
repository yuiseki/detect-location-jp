import fs from 'fs/promises';
import { fetchNominatim, fetchOverpass } from './common';
import states from '../data/japan_states.json';
import { POI } from '../types/poi';

const tmpPath = './tmp/japan/states/';

(async () => {
  let results:POI[] = [];
  for await (const state of states) {
    console.log(state.state);
    try {
      const read = await fs.readFile(`${tmpPath}${state.code}.json`, 'utf-8');
      const json:POI[] = JSON.parse(read);
      results = results.concat(json)
    } catch {
      const stateResults = [];
      const overpass_query_level_7 = `
        [out:json][timeout:30000];
        area["name:ja"="${state.state}"];
        relation(area)["admin_level"="7"]["type"="boundary"]["boundary"="administrative"]["name"];
        out tags;`;
      console.log(overpass_query_level_7)
      const level7 = await fetchOverpass(overpass_query_level_7);
      for await (const item of level7) {
        console.log(state.state, item.tags.name);
        const params = new URLSearchParams();
        params.append('state', state.state);
        params.append('city', item.tags.name);
        params.append('format', 'jsonv2');
        const coord = await fetchNominatim(params.toString());
        if (!coord[0]) {
          continue;
        }
        let name_en = item.tags['name:en']
        if(item.tags['name:ja-Latn']) {
          name_en = item.tags['name:ja-Latn']
        }
        if(item.tags['name:ja_rm']) {
          name_en = item.tags['name:ja_rm']
        }
        const result:POI = {
          id: item.id,
          code: null,
          country: state.country,
          country_en: state.country_en,
          country_ja: state.country_ja,
          state: state.state,
          state_en: state.state_en,
          state_ja: state.state_ja,
          city: item.tags.name,
          city_en: name_en,
          city_ja: item.tags.name,
          latitude: coord[0].lat,
          longitude: coord[0].lon
        }
        stateResults.push(result);
        results = results.concat(stateResults)
      }
      await fs.writeFile(`${tmpPath}${state.code}.json`, JSON.stringify(stateResults, null, 2));
    }
  }
  console.log(results)
  await fs.writeFile('./src/data/japan_cities.json', JSON.stringify(results, null, 2))
})();
