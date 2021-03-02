import type { App } from 'vue';
import { SvgIcon } from './SvgIcon';

export function setupIcon(app: App<Element>) {
  app.component('SvgIcon', SvgIcon);
}
