<template>
  <LayoutContent>
    <div class="page-content__view">
      <RouterView v-slot="{ Component, route }">
        <transition name="fade" mode="out-in" appear>
          <KeepAlive :include="cacheComponents">
            <component :is="Component" :key="route.path" />
          </KeepAlive>
        </transition>
      </RouterView>
    </div>
  </LayoutContent>
</template>

<script lang="ts">
  import { defineComponent, computed, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { useStore } from 'vuex';
  import { Layout } from 'ant-design-vue';
  export default defineComponent({
    name: 'PageContent',
    components: {
      LayoutContent: Layout.Content,
    },
    setup() {
      const currentRoute = useRoute();
      const store = useStore();
      const tabsState = computed(() => store.state.tab.tabsState);

      const cacheComponents = ref<string[]>();

      const getCacheComponents = () => {
        const cache: string[] = [];
        tabsState.value.forEach((tab) => {
          if (!tab?.meta?.ignoreKeepAlive) {
            cache.push(tab.fullPath);
          }
        });
        cacheComponents.value = cache;
      };

      watch(
        () => currentRoute.fullPath,
        () => {
          getCacheComponents();
        }
      );

      return {
        cacheComponents,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .page-content {
    height: 100%;
    min-width: 1000px;
    padding: 16px;
    flex: 1;
    overflow: auto;

    .page-content__view {
      min-height: 100%;
      padding: 10px;
      background-color: #fff;
    }
  }
</style>
