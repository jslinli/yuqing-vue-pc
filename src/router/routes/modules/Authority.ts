import { BASE_LAYOUT } from '@/router/constant';

const AuthorityRoute = {
  path: '/authority',
  name: 'Authority',
  redirect: '/authority/user',
  component: BASE_LAYOUT,
  meta: {
    title: '权限管理',
    icon: 'icon-quanxianguanliauthority',
  },
  children: [
    {
      path: 'user',
      name: 'User',
      component: () => import('@/pages/Authority/User/index.vue'),
      meta: {
        title: '用户列表',
        icon: 'icon-user',
      },
    },
    {
      path: 'role',
      name: 'Role',
      component: () => import('@/pages/Authority/Role/index.vue'),
      meta: {
        title: '角色管理',
        icon: 'icon-jiaoseguanlirole',
      },
    },
    {
      path: 'menu',
      name: 'Menu',
      component: () => import('@/pages/Authority/Menu/index.vue'),
      meta: {
        title: '菜单管理',
        icon: 'icon-menu',
      },
    },
  ],
};

export default AuthorityRoute;
