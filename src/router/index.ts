import { createRouter, createWebHistory } from 'vue-router';
import type { App } from 'vue';
import { BasicRoutes } from './routes';
import { createGuard } from './guard';

const router = createRouter({
  history: createWebHistory(),
  routes: BasicRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App<Element>) {
  app.use(router);
  createGuard(router);
}

export default router;
