// 获取焦点
import type { Directive } from 'vue';

const focus: Directive = {
  mounted(el: HTMLInputElement) {
    el.focus();
  },
};

export default focus;
