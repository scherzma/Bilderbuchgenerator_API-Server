import defaultConfig from './default.config';

function getConfig() {
  return defaultConfig;
}

export function getAuthConfig() {
  return getConfig().auth;
}

export function getDBConfig() {
  return getConfig().db;
}

export function getApiConfig() {
  return getConfig().api;
}

export function getDevelopmentConfig() {
  return getConfig().development;
}

export default () => getConfig();
