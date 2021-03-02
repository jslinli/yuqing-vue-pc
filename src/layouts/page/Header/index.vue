<template>
  <LayoutHeader class="page-header">
    <div class="page-header-main">
      <div class="page-header-main__left">
        <MenuUnfoldOutlined
          v-if="collapsed"
          class="trigger"
          @click="() => setCollapsed(!collapsed)"
        />
        <MenuFoldOutlined v-else class="trigger" @click="() => setCollapsed(!collapsed)" />
      </div>
      <div class="page-header-main__right">
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
      </div>
    </div>
  </LayoutHeader>
</template>

<script lang="ts">
  import { defineComponent, toRefs } from 'vue';
  import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    CopyOutlined,
    PoweroffOutlined,
  } from '@ant-design/icons-vue';
  import { Layout, Menu, Avatar, Dropdown } from 'ant-design-vue';

  interface IProps {
    collapsed: boolean;
  }
  export default defineComponent({
    name: 'PageHeader',
    components: {
      MenuUnfoldOutlined,
      MenuFoldOutlined,
      CopyOutlined,
      PoweroffOutlined,
      LayoutHeader: Layout.Header,
      Menu,
      MenuItem: Menu.Item,
      MenuDivider: Menu.Divider,
      Avatar,
      Dropdown,
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
    height: 50px;
    min-width: 1000px;
    padding: 0;
    line-height: 50px;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgb(29 35 41 / 5%);

    .page-header-main {
      display: flex;
      justify-content: space-between;

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
        .avatar-container {
          display: flex;
          align-items: center;
          padding: 0 20px;

          .avatar {
            margin-right: 8px;
          }
        }
      }
    }
  }
</style>
