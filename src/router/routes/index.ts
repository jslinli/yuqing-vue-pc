import { LoginRoute, RootRoute } from '../constant';

const modules = import.meta.globEager('./modules/**/*.ts');

export const asyncRoutes: any[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  asyncRoutes.push(mod);
});

// 基础路由
export const BasicRoutes = [LoginRoute, RootRoute, ...asyncRoutes];
