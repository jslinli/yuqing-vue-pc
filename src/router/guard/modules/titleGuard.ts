import type { Router } from 'vue-router';
import { setTitle } from '@/utils/utils';

export default (router: Router) => {
  router.afterEach((to) => {
    const title = to.meta?.title;
    title && setTitle(title, import.meta.env.VITE_APP_TITLE as string);
    return true;
  });
};
