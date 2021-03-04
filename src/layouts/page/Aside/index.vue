<template>
  <LayoutSider class="page-aside" width="256" :collapsed="collapsed" :trigger="null" collapsible>
    <RouterLink class="logo-container" to="/">
      <img :src="logo" alt="logo" />
      <h1 v-show="!collapsed">杭州宇擎</h1>
    </RouterLink>
    <Menu
      class="aside-menu"
      theme="dark"
      mode="inline"
      :inline-collapsed="collapsed"
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      @click="clickMenuItem"
    >
      <template v-for="route in menuRoutes" :key="route.name">
        <AsideItem :item="route" />
      </template>
    </Menu>
  </LayoutSider>
</template>

<script lang="ts">
  import { defineComponent, watch, nextTick, toRefs, reactive } from 'vue';
  import { Layout, Menu } from 'ant-design-vue';
  import { useRouter, useRoute } from 'vue-router';
  import type { RouteRecordRaw } from 'vue-router';
  import AsideItem from '../AsideItem/index.vue';
  import logo from '@/assets/images/logo.png';
  import { pageEnum } from '@/enums/pageEnum';
  import { routesToMenu } from '../utils';

  interface IProps {
    collapsed: boolean;
  }
  interface AsideState {
    selectedKeys: string[];
    openKeys: string[];
    menuRoutes: RouteRecordRaw[];
  }

  export default defineComponent({
    name: 'PageAside',
    components: {
      LayoutSider: Layout.Sider,
      Menu,
      AsideItem,
    },
    props: {
      collapsed: {
        type: Boolean,
      },
    },
    setup(props: IProps) {
      const {
        options: { routes },
        push,
      } = useRouter();
      const currentRoute = useRoute();

      nextTick(() => {
        state.menuRoutes = routesToMenu(routes);
      });

      const state = reactive<AsideState>({
        selectedKeys: [currentRoute.name] as string[], // 当前选中的菜单项
        openKeys: getOpenKeys(), // 当前展开的 SubMenu 菜单项
        menuRoutes: [], // 菜单数据
      });

      function getOpenKeys() {
        return [currentRoute.matched[0]?.name] as string[];
      }

      // 跟随页面路由变化，切换菜单选中状态
      watch([() => currentRoute.fullPath, () => props.collapsed], () => {
        if (currentRoute.path == pageEnum.BASE_LOGIN) return;
        if (props.collapsed) {
          state.openKeys = [];
          return;
        }
        state.openKeys = getOpenKeys();
        state.selectedKeys = [currentRoute.name] as string[];
      });

      const clickMenuItem = ({ key }) => {
        push({ name: key });
      };

      return {
        logo,
        currentRoute,
        clickMenuItem,
        ...toRefs(props),
        ...toRefs(state),
      };
    },
  });
</script>

<style lang="scss" scoped>
  .page-aside {
    box-shadow: 2px 0 6px rgb(0 21 41 / 35%);

    .logo-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      overflow: hidden;
      color: #fff;
      white-space: nowrap;
      cursor: pointer;

      img {
        width: 32px;
      }

      h1 {
        margin-bottom: 0;
        margin-left: 20px;
        font-size: 24px;
        color: #fff;
      }
    }

    .aside-menu {
      height: calc(100% - 50px);
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
</style>
