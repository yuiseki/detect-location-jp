import countries from './data/countries.json';
import states from './data/japan_states.json';
import cities from './data/japan_cities.json';

export const detectLocation = async (text:string) => {
  let result = null;
  for (const country of countries) {
    if (country.country_ja) {
      const regexp = RegExp(country.country_ja, 'g');
      if (text.match(regexp)) {
        result = country;
      }
    }
  }
  for (const state of states) {
    const regexp = RegExp(state.state_ja, 'g');
    if (text.match(regexp)) {
      result = state;
    }
  }
  for (const city of cities) {
    const regexp = RegExp(city.city_ja, 'g');
    if (text.match(regexp)) {
      if (result && result.city === city.state) {
        result = city;
      } else {
        result = city;
      }
    }
  }
  return result;
}
