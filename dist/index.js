"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectLocation = void 0;
const japan_states_json_1 = __importDefault(require("./data/japan_states.json"));
const detectLocation = async (text) => {
    let result = null;
    for (const state of japan_states_json_1.default) {
        const regexp = RegExp(state.name, 'g');
        if (text.match(regexp)) {
            result = state;
        }
    }
};
exports.detectLocation = detectLocation;
