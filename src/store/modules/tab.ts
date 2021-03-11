/**
 * tab页签状态管理
 */
import type { RouteLocationNormalized } from 'vue-router';
export interface TabState {
  tabsState: RouteLocationNormalized[];
}

export const NAMESPACE_TAB = 'tab/';

export enum TabMutationType {
  InitTabs = 'INIT_TABS',
  AddTabs = 'ADD_TABS',
  CloseLeftTabs = 'CLOSE_LEFT_TABS',
  CloseRightTabs = 'CLOSE_RIGHT_TABS',
  CloseOtherTabs = 'CLOSE_OTHER_TABS',
  CloseCurrentTabs = 'CLOSE_CURRENT_TABS',
  CloseAllTabs = 'CLOSE_ALL_TABS',
}

const state = () =>
  <TabState>{
    tabsState: [],
  };

const getters = {
  getTabsState(state: TabState) {
    return state.tabsState?.filter((item) => !item.meta?.hideTab);
  },
};

const mutations = {
  // 初始化标签页
  [TabMutationType.InitTabs](state: TabState, routes: RouteLocationNormalized[]) {
    state.tabsState = routes;
  },
  // 添加标签页
  [TabMutationType.AddTabs](state: TabState, route: RouteLocationNormalized) {
    const isExists = state.tabsState.some((item) => item.fullPath == route.fullPath);
    if (!isExists) {
      state.tabsState.push(route);
    }
  },
  // 关闭左侧标签
  [TabMutationType.CloseLeftTabs](state: TabState, route: RouteLocationNormalized) {
    const index = state.tabsState.findIndex((item) => item.fullPath == route.fullPath);
    state.tabsState.splice(0, index);
  },
  // 关闭右侧标签
  [TabMutationType.CloseRightTabs](state: TabState, route: RouteLocationNormalized) {
    const index = state.tabsState.findIndex((item) => item.fullPath == route.fullPath);
    state.tabsState.splice(index + 1);
  },
  // 关闭其他标签
  [TabMutationType.CloseOtherTabs](state: TabState, route: RouteLocationNormalized) {
    state.tabsState = state.tabsState.filter((item) => item.fullPath == route.fullPath);
  },
  // 关闭全部标签
  [TabMutationType.CloseAllTabs](state: TabState) {
    state.tabsState = [];
  },
};

const app = {
  namespaced: true,
  state,
  getters,
  mutations,
};

export default app;
