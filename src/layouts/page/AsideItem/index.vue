<template>
  <template v-if="item.children?.length">
    <SubMenu :key="item.name" v-bind="$attrs">
      <template #title>
        <span>
          <SvgIcon :type="item.meta?.icon" v-if="item.meta?.icon" />
          <span>{{ item.meta?.title }}</span>
        </span>
      </template>
      <AsideItem v-for="child in item.children" :key="child.name" :item="child" />
    </SubMenu>
  </template>

  <template v-else>
    <MenuItem :key="item.name">
      <SvgIcon :type="item.meta?.icon" v-if="item.meta?.icon" />
      <span>{{ item.meta?.title }}</span>
    </MenuItem>
  </template>
</template>

<script lang="ts">
  import { defineComponent, toRefs } from 'vue';
  import type { RouteRecordRaw } from 'vue-router';
  import { Menu } from 'ant-design-vue';

  interface IProps {
    item: RouteRecordRaw;
  }
  export default defineComponent({
    name: 'AsideItem',
    components: {
      SubMenu: Menu.SubMenu,
      MenuItem: Menu.Item,
    },
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    setup(props: IProps) {
      return {
        ...toRefs(props),
      };
    },
  });
</script>
