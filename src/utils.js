import {config} from './config.js';
export function createUrl(path) {
  return `${config.serverUrl}/${path}`;
} 