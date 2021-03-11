<template>
  <Menu style="user-select: none;">
    <MenuItem key="1">
      <ReloadOutlined />
      刷新
    </MenuItem>
    <MenuItem key="2">
      <CloseOutlined />
      关闭
    </MenuItem>
    <MenuItem key="3">
      <VerticalRightOutlined />
      关闭左侧
    </MenuItem>
    <MenuItem key="4">
      <VerticalLeftOutlined />
      关闭右侧
    </MenuItem>
    <MenuItem key="5">
      <ColumnWidthOutlined />
      关闭其他
    </MenuItem>
    <MenuItem key="6">
      <MinusOutlined />
      关闭全部
    </MenuItem>
  </Menu>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Menu } from 'ant-design-vue';
  import {
    ReloadOutlined,
    CloseOutlined,
    VerticalRightOutlined,
    VerticalLeftOutlined,
    ColumnWidthOutlined,
    MinusOutlined,
  } from '@ant-design/icons-vue';

  export default defineComponent({
    name: 'DropMenuList',
    components: {
      Menu,
      MenuItem: Menu.Item,
      ReloadOutlined,
      CloseOutlined,
      VerticalRightOutlined,
      VerticalLeftOutlined,
      ColumnWidthOutlined,
      MinusOutlined,
    },
    setup() {},
  });
</script>
