<template>
  <LayoutContent>
    <div class="page-content__view">
      <RouterView v-slot="{ Component, route }">
        <transition name="fade" mode="out-in" appear>
          <!-- 需要保持缓存时开启 -->
          <!-- <keep-alive> -->
          <component :is="Component" :key="route.path" />
          <!-- </keep-alive> -->
        </transition>
      </RouterView>
    </div>
  </LayoutContent>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Layout } from 'ant-design-vue';
  export default defineComponent({
    name: 'PageContent',
    components: {
      LayoutContent: Layout.Content,
    },
  });
</script>

<style lang="scss" scoped>
  .page-content {
    min-width: 1000px;
    padding: 16px;
    flex: 1;
    overflow: auto;

    .page-content__view {
      height: 100%;
      padding: 10px;
      background-color: #fff;
    }
  }
</style>
