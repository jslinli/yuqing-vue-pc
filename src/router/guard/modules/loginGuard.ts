import type { Router } from 'vue-router';
import store from '@/store';
import { pageEnum } from '@/enums/pageEnum';

export default (router: Router) => {
  router.beforeEach((to, _, next) => {
    const isLogin = store.state?.user?.token;
    // 判断用户是否登录
    if (isLogin) {
      if (to.path === pageEnum.BASE_LOGIN) {
        return next(pageEnum.BASE_HOME);
      }
      return next();
    } else {
      return next(`${pageEnum.BASE_LOGIN}?redirect=${to.path}`);
    }
  });
};
