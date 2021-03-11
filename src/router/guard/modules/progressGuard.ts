import type { Router } from 'vue-router';

import NProgress from 'nprogress';

export default (router: Router) => {
  router.beforeEach(() => {
    NProgress.start();
    return true;
  });

  router.afterEach(() => {
    NProgress.done();
    return true;
  });
};
