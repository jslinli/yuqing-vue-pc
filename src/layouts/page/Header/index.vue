<template>
  <div class="page-header">
    <LayoutHeader class="page-header-main">
      <div class="page-header-main__left">
        <MenuUnfoldOutlined
          v-if="collapsed"
          class="trigger"
          @click="() => setCollapsed(!collapsed)"
        />
        <MenuFoldOutlined v-else class="trigger" @click="() => setCollapsed(!collapsed)" />
        <PageBreadcrumb />
      </div>
      <div class="page-header-main__right">
        <FullScreen />
        <Personal />
      </div>
    </LayoutHeader>
    <!-- <MultipleTabs /> -->
  </div>
</template>

<script lang="ts">
  import { defineComponent, toRefs } from 'vue';
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
  import { Layout } from 'ant-design-vue';
  import PageBreadcrumb from '../Breadcrumb/index.vue';
  import MultipleTabs from '../Tabs/index.vue';
  import FullScreen from './Fullscreen.vue';
  import Personal from './Personal.vue';

  interface IProps {
    collapsed: boolean;
  }
  export default defineComponent({
    name: 'PageHeader',
    components: {
      MenuUnfoldOutlined,
      MenuFoldOutlined,
      LayoutHeader: Layout.Header,
      PageBreadcrumb,
      MultipleTabs,
      FullScreen,
      Personal,
    },
    props: {
      collapsed: {
        type: Boolean,
      },
    },
    emits: ['chang-collapsed'],
    setup(props: IProps, { emit }) {
      function setCollapsed(state: boolean) {
        emit('chang-collapsed', state);
      }

      return {
        ...toRefs(props),
        setCollapsed,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .page-header {
    z-index: 99;
    min-width: 1000px;
    box-shadow: 0 1px 2px 0 rgb(29 35 41 / 5%);

    .page-header-main {
      display: flex;
      justify-content: space-between;
      height: 50px;
      padding: 0;
      line-height: 50px;
      background-color: #fff;
      border-bottom: 1px solid #eee;

      .page-header-main__left {
        display: flex;
        align-items: center;

        .trigger {
          display: flex;
          align-items: center;
          height: 100%;
          padding: 0 15px;
          font-size: 18px;

          &:hover {
            color: #1890ff;
            background-color: #f6f6f6;
          }
        }
      }

      .page-header-main__right {
        display: flex;

        span {
          padding: 0 10px;

          &:hover {
            cursor: pointer;
            background-color: #f6f6f6;
          }
        }
      }
    }
  }
</style>
