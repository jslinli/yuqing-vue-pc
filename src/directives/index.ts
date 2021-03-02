import type { App } from 'vue';

const files = import.meta.globEager('./modules/**/*.ts');

const directives = (app: App<Element>) => {
  Object.keys(files).forEach((key) => {
    const module = files[key].default || {};
    const moduleName = key.replace(/(.*\/)*([^.]+).*/gi, '$2');
    app.directive(moduleName, module);
  });
};

export const setupDirective = (app: App<Element>) => {
  app.use(directives);
};
