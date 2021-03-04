<template>
  <Breadcrumb :routes="routes">
    <template #itemRender="{ route, routes, paths }">
      <span v-if="routes.indexOf(route) === routes.length - 1">
        {{ route.meta?.title }}
      </span>
      <router-link v-else :to="`/${paths.join('/')}`">
        {{ route.meta?.title }}
      </router-link>
    </template>
  </Breadcrumb>
</template>

<script lang="ts">
  import { defineComponent, ref, watchEffect } from 'vue';
  import { useRoute } from 'vue-router';
  import type { RouteLocationMatched, RouteLocationNormalizedLoaded } from 'vue-router';
  import { Breadcrumb } from 'ant-design-vue';
  import { pageEnum } from '@/enums/pageEnum';

  export default defineComponent({
    name: 'pageBreadcrumb',
    components: {
      Breadcrumb,
    },
    setup() {
      const currentRoute: RouteLocationNormalizedLoaded = useRoute();

      const routes = ref<RouteLocationMatched[]>([]);

      watchEffect(() => {
        if (currentRoute.meta?.hideBreadcrumb) {
          routes.value = [];
          return;
        }
        if (currentRoute.path !== pageEnum.BASE_HOME) {
          routes.value = [
            ({
              path: '/',
              meta: {
                title: '首页',
              },
            } as unknown) as RouteLocationMatched,
            ...currentRoute.matched,
          ];
          return;
        }
        routes.value = [currentRoute.matched[1]];
      });

      return {
        routes,
      };
    },
  });
</script>
