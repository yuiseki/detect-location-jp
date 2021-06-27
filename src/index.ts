import states from './data/japan_states.json';
import cities from './data/japan_cities.json';

export const detectLocation = async (text:string) => {
  let result = null;
  for (const state of states) {
    const regexp = RegExp(state.name, 'g');
    if (text.match(regexp)) {
      result = state;
    }
  }
  for (const city of cities) {
    const regexp = RegExp(city.name, 'g');
    if (text.match(regexp)) {
      if (result && result.name === city.state) {
        result = city;
      } else {
        result = city;
      }
    }
  }
  return result;
}
