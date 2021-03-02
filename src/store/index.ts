import { createStore, createLogger } from 'vuex';
import type { App } from 'vue';
import { isDevMode } from '@/utils/env';

const isDev = isDevMode();

const files = import.meta.globEager('./modules/**/*.ts');

const modules = {};

Object.keys(files).forEach((key) => {
  const module = files[key].default || {};
  const moduleName = key.replace(/(.*\/)*([^.]+).*/gi, '$2');
  modules[moduleName] = module;
});

const plugins = isDev ? [createLogger()] : [];

const store = createStore<any>({
  strict: isDev,
  devtools: isDev,
  plugins,
  modules,
});

export function setupStore(app: App<Element>) {
  app.use(store);
}

export default store;
