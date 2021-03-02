import type { Router } from 'vue-router';

import nProgress from 'nprogress';

export default (router: Router) => {
  router.beforeEach(() => {
    nProgress.start();
    return true;
  });

  router.afterEach(() => {
    nProgress.done();
    return true;
  });
};
