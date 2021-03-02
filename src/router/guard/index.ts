/**
 * 路由守卫
 */
import type { Router } from 'vue-router';

const files = import.meta.globEager('./modules/**/*.ts');

export function createGuard(router: Router) {
  Object.keys(files).forEach((key) => {
    const module = files[key].default || {};
    module(router);
  });
}
