<template>
  <Breadcrumb :routes="routes">
    <template #itemRender="{ route, routes, paths }">
      <span v-if="routes.indexOf(route) === routes.length - 1">
        {{ route.meta?.title }}
      </span>
      <RouterLink v-else :to="`/${paths.join('/')}`">
        {{ route.meta?.title }}
      </RouterLink>
    </template>
  </Breadcrumb>
</template>

<script lang="ts">
  import { defineComponent, ref, watchEffect } from 'vue';
  import { useRoute } from 'vue-router';
  import type { RouteLocationMatched, RouteLocationNormalizedLoaded } from 'vue-router';
  import { Breadcrumb } from 'ant-design-vue';
  import { PageEnum } from '@/enums/pageEnum';

  export default defineComponent({
    name: 'PageBreadcrumb',
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
        if (currentRoute.path !== PageEnum.BASE_HOME) {
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
