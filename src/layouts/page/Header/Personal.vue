<template>
  <Dropdown>
    <span class="avatar-container">
      <Avatar
        class="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      />
      <span>宇擎</span>
    </span>
    <template #overlay>
      <Menu>
        <MenuItem key="0">
          <span>
            <CopyOutlined />
            文档
          </span>
        </MenuItem>
        <MenuDivider />
        <MenuItem key="1">
          <span>
            <PoweroffOutlined />
            退出系统
          </span>
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Dropdown, Menu, Avatar } from 'ant-design-vue';
  import { CopyOutlined, PoweroffOutlined } from '@ant-design/icons-vue';
  export default defineComponent({
    name: 'Personal',
    components: {
      Dropdown,
      Menu,
      MenuItem: Menu.Item,
      MenuDivider: Menu.Divider,
      Avatar,
      CopyOutlined,
      PoweroffOutlined,
    },
  });
</script>

<style lang="scss" scoped>
  .avatar-container {
    display: flex;
    align-items: center;
    padding: 0 20px;

    &:hover {
      cursor: pointer;
      background-color: #f6f6f6;
    }

    .avatar {
      margin-right: 8px;
    }
  }
</style>
