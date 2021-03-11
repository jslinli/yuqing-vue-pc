<template>
  <Layout class="page-layout">
    <PageAside :collapsed="collapsed" />
    <Layout class="page-main">
      <PageHeader :collapsed="collapsed" @chang-collapsed="changeCollapsed" />
      <PageContent class="page-content" />
      <BackTop :target="target" />
    </Layout>
  </Layout>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Layout, BackTop } from 'ant-design-vue';
  import PageHeader from './Header/index.vue';
  import PageAside from './Aside/index.vue';
  import PageContent from './Content/index.vue';

  export default defineComponent({
    name: 'PageLayout',
    components: {
      Layout,
      BackTop,
      PageHeader,
      PageAside,
      PageContent,
    },
    setup() {
      // 导航是否收起
      const collapsed = ref(false);
      // 更改导航收起状态
      function changeCollapsed(state: boolean) {
        collapsed.value = state;
      }

      return {
        collapsed,
        changeCollapsed,
        target: () => document.querySelector('.page-content'),
      };
    },
  });
</script>

<style lang="scss">
  .page-layout {
    height: 100vh;
    overflow-y: hidden;

    .page-main {
      display: flex;
      flex-direction: column;
    }
  }
</style>
