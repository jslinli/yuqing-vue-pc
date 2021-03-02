// 点击复制
import type { Directive } from 'vue';
import { copyText } from '@/utils/utils';
import { useMessage } from '@/hooks/useMessage';

const { createMessage } = useMessage();

const copy: Directive = {
  mounted(el: HTMLElement, binding) {
    el.addEventListener('click', () => {
      copyText(
        binding.value,
        () => createMessage.success('复制成功'),
        (tip) => createMessage.warning(tip)
      );
    });
  },
};

export default copy;
