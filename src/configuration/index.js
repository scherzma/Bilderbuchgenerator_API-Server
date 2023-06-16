import defaultConfig from "./default.config.js";

function getConfig() {
  return defaultConfig;
}

export function getMemoryChacheConfig() {
  return getConfig().memoryChache;
}

export function getOpenAIApiConfig() {
  return getConfig().openai;
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
