import type { RouteRecordRaw } from 'vue-router';

export function routesToMenu(routes: RouteRecordRaw[]) {
  const menus: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    if (!route.meta?.hideMenu) {
      if (route.meta?.single && route.children) {
        menus.push(route.children[0]);
      } else {
        menus.push(route);
      }
    }
  });
  return menus;
}
