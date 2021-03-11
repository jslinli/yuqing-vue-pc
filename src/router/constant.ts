import { PageEnum } from '@/enums/pageEnum';

export const BASE_LAYOUT = () => import('@/layouts/page/index.vue');

export const LoginRoute = {
  path: '/login',
  name: 'Login',
  component: () => import('@/pages/Login/index.vue'),
  meta: {
    hideMenu: true,
  },
};

export const RootRoute = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  component: BASE_LAYOUT,
  meta: {
    title: '首页',
    single: true,
  },
  children: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/pages/Home/index.vue'),
      meta: {
        title: '首页',
        icon: 'icon-home',
      },
    },
  ],
};
