import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRouter } from './router';
import { setupStore } from './store';
import { setupDirective } from './directives';
import dayjs from 'dayjs';
import moment from 'moment';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import 'dayjs/locale/zh-cn';
import { isDevMode } from '@/utils/env';
import { setupIcon } from './icons';
import './styles/index.scss';

dayjs.extend(isLeapYear);
dayjs.locale('zh-cn');
moment.locale('zh-cn');

const app = createApp(App);

// 挂载iconfont图标组件
setupIcon(app);

// 挂载路由
setupRouter(app);

// 挂载vuex
setupStore(app);

// 挂载指令
setupDirective(app);

router.isReady().then(() => {
  app.mount('#app', true);
});

if (isDevMode()) {
  app.config.performance = true;
  window.__APP__ = app;
}
