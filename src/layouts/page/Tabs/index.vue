<template>
  <div class="multiple-tabs">
    <Tabs
      size="small"
      type="editable-card"
      hideAdd
      :animated="false"
      :tabBarGutter="3"
      @change="handleChange"
      @edit="handleEdit"
    >
      <TabPane v-for="item in tabsState" :key="item.fullPath" closable>
        <template #tab>
          <TabContent :tabItem="item" :type="TabContentEnum.TAB_TYPE" />
        </template>
      </TabPane>

      <template #tabBarExtraContent>
        <TabContent :type="TabContentEnum.EXTRA_TYPE" :tabItem="$route" />
      </template>
    </Tabs>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, ref, watch, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useStore } from 'vuex';
  import { Tabs } from 'ant-design-vue';
  import TabContent from './TabContent.vue';
  import { TabContentEnum } from './types';
  import { TabMutationType, NAMESPACE_TAB } from '@/store/modules/tab';

  export default defineComponent({
    name: 'MultipleTabs',
    components: {
      Tabs,
      TabPane: Tabs.TabPane,
      TabContent,
    },
    setup() {
      const currentRoute = useRoute();
      const store = useStore();
      const tabsState = computed(() => store.getters[NAMESPACE_TAB + 'getTabsState']);

      console.log(tabsState, 'tabsState');

      const activeKey = ref(currentRoute.fullPath);

      onMounted(() => {
        store.commit(NAMESPACE_TAB + TabMutationType.InitTabs, [currentRoute]);
      });

      watch(
        () => currentRoute.fullPath,
        () => {
          // console.log(currentRoute.fullPath, 'fullPath');
          activeKey.value = currentRoute.fullPath;
          store.commit(NAMESPACE_TAB + TabMutationType.AddTabs, currentRoute);
        }
      );

      const handleChange = (activeKey: string) => {
        console.log(activeKey, 'activeKey');
      };

      const handleEdit = (targetKey, action) => {
        console.log(targetKey, action, 'targetKey, action');
      };

      return {
        tabsState,
        TabContentEnum,
        activeKey,
        handleChange,
        handleEdit,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .multiple-tabs {
    display: flex;
    height: 32px;
    padding-left: 6px;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;

    ::v-deep(.ant-tabs) {
      width: 100%;
      height: 30px;
      margin: 0;
      border: none;

      .ant-tabs-bar {
        width: 100%;
        height: 30px;
        margin: 0;
        border: none;
      }

      .ant-tabs-nav-container {
        height: 100%;

        .ant-tabs-tab {
          height: 28px;
          line-height: 28px;
          border: 1px solid #d7ddeb;
        }

        .ant-tabs-tab-active {
          position: relative;
          padding-left: 20px;
          color: #fff;
          background-color: #1890ff;
          border: 1px solid #1890ff;

          &::before {
            position: absolute;
            top: calc(50% - 3px);
            left: 8px;
            width: 6px;
            height: 6px;
            background: #fff;
            border-radius: 50%;
            content: '';
            transition: none;
          }

          svg {
            width: 0.7em;
            fill: #fff;
          }
        }
      }

      .ant-tabs-extra-content {
        height: 30px;
        line-height: 30px;
      }
    }
  }
</style>
