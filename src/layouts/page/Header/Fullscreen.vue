<template>
  <Tooltip :title="getTitle" placement="bottom">
    <span @click="toggleFullscreen">
      <FullscreenOutlined v-if="!isFullscreen" />
      <FullscreenExitOutlined v-else />
    </span>
  </Tooltip>
</template>

<script lang="ts">
  import { defineComponent, computed, unref } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue';
  import { useFullscreen } from '../hooks/useFullScreen';
  export default defineComponent({
    name: 'FullScreen',
    components: { FullscreenExitOutlined, FullscreenOutlined, Tooltip },
    setup() {
      const { toggleFullscreen, isFullscreenRef } = useFullscreen();

      const getTitle = computed(() => (unref(isFullscreenRef) ? '退出全屏' : '全屏'));

      return {
        getTitle,
        isFullscreen: isFullscreenRef,
        toggleFullscreen,
      };
    },
  });
</script>
