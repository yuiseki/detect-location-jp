import states from './data/japan_states.json';

export const detectLocation = async (text:string) => {
  let result = null;
  for (const state of states) {
    const regexp = RegExp(state.name, 'g');
    if (text.match(regexp)) {
      result = state;
    }
  }
}
