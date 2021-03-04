import type { RouteRecordRaw } from 'vue-router';

// TODO 将路由转换为菜单 后期优化
export function routesToMenu(routes: RouteRecordRaw[]) {
  return routes
    .filter((route) => {
      return !route.meta?.hideMenu;
    })
    .map((route) => {
      if (route.meta?.single && route.children) {
        return route.children[0];
      }
      return route;
    });
}
