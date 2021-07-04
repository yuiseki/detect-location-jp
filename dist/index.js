"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectLocation = exports.cities = exports.states = exports.countries = void 0;
const countries_json_1 = __importDefault(require("./data/countries.json"));
const japan_states_json_1 = __importDefault(require("./data/japan_states.json"));
const japan_cities_json_1 = __importDefault(require("./data/japan_cities.json"));
exports.countries = countries_json_1.default;
exports.states = japan_states_json_1.default;
exports.cities = japan_cities_json_1.default;
const detectLocation = async (text) => {
    let result = null;
    for (const country of exports.countries) {
        if (country.country_ja) {
            const regexp = RegExp(country.country_ja, 'g');
            if (text.match(regexp)) {
                result = country;
            }
        }
    }
    for (const state of exports.states) {
        const regexp = RegExp(state.state_ja, 'g');
        if (text.match(regexp)) {
            result = state;
        }
    }
    for (const city of exports.cities) {
        const regexp = RegExp(city.city_ja, 'g');
        if (text.match(regexp)) {
            if (result && result.city === city.state) {
                result = city;
            }
            else {
                result = city;
            }
        }
    }
    return result;
};
exports.detectLocation = detectLocation;
