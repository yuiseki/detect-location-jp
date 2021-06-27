import fs from 'fs/promises';
import { fetchNominatim, fetchOverpass } from './common';
import states from '../src/data/japan_states.json';

interface City {
  name: string;
  state: string;
  latitude: number;
  longitude: number;
}

const tmpPath = './tmp/japan/states/';

(async () => {
  let results:City[] = [];
  for await (const state of states) {
    console.log(state.name);
    if (await fs.lstat(`${tmpPath}${state.code}.json`)) {
      const read = await fs.readFile(`${tmpPath}${state.code}.json`, 'utf-8');
      const json:City[] = JSON.parse(read);
      results = results.concat(json)
    } else {
      const stateResults = [];
      const overpass_query_level_7 = `
        [out:json][timeout:30000];
        area["name:ja"="${state.name}"];
        relation(area)["admin_level"="7"]["type"="boundary"]["boundary"="administrative"]["name"];
        out tags;`;
      const level7 = await fetchOverpass(overpass_query_level_7);
      for await (const item of level7) {
        console.log(state.name, item.tags.name);
        const params = new URLSearchParams();
        params.append('state', state.name);
        params.append('city', item.tags.name);
        params.append('format', 'jsonv2');
        const coord = await fetchNominatim(params.toString());
        if (!coord[0]) {
          continue;
        }
        const result = {
          name: item.tags.name,
          name_en: item.tags['name:en'],
          id: item.id,
          state: state.name,
          latitude: coord[0].lat,
          longitude: coord[0].lon
        }
        stateResults.push(result);
        results = results.concat(stateResults)
        await fs.writeFile(`${tmpPath}${state.code}.json`, JSON.stringify(stateResults, null, 2));
      }
    }
  }
  console.log(results)
  await fs.writeFile('./src/data/japan_cities.json', JSON.stringify(results, null, 2))
})();
