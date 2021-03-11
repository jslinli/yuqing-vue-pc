<template>
  <Dropdown :trigger="getTrigger" placement="bottomRight">
    <div v-if="isTabs">{{ getTitle }}</div>

    <span class="extra-icon" v-else><DownOutlined /></span>

    <template #overlay>
      <DropMenuList />
    </template>
  </Dropdown>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType, unref } from 'vue';
  import type { RouteLocationNormalized } from 'vue-router';
  import { Dropdown } from 'ant-design-vue';
  import { DownOutlined } from '@ant-design/icons-vue';
  import { TabContentEnum } from './types';
  import DropMenuList from './DropMenuList.vue';

  export default defineComponent({
    name: 'TabContent',
    components: {
      Dropdown,
      DownOutlined,
      DropMenuList,
    },
    props: {
      tabItem: {
        type: Object as PropType<RouteLocationNormalized>,
      },
      type: {
        type: Number as PropType<TabContentEnum>,
        default: TabContentEnum.TAB_TYPE,
      },
    },
    setup(props: any) {
      // 判断是否为tab标签
      const isTabs = computed(() => props.type === TabContentEnum.TAB_TYPE);

      // 触发事件
      const getTrigger = computed<('click' | 'contextmenu' | 'hover')[]>(() => {
        return unref(isTabs) ? ['contextmenu'] : ['click'];
      });

      // 获取标签名称
      const getTitle = computed(() => {
        const {
          tabItem: { meta },
        } = props;
        return meta?.title;
      });

      return {
        isTabs,
        getTrigger,
        getTitle,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .extra-icon {
    display: flex;
    width: 36px;
    height: 100%;
    justify-content: center;
    align-items: center;
    border-left: 1px solid #eee;

    &:hover {
      background-color: #f6f6f6;
    }
  }
</style>
