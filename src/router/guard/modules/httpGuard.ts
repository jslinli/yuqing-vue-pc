import type { Router } from 'vue-router';
import { AxiosCanceler } from '@/utils/http/cancel';

export default (router: Router) => {
  router.beforeEach(() => {
    const axiosCanceler = new AxiosCanceler();
    axiosCanceler?.removeAllPending();
    return true;
  });
};
