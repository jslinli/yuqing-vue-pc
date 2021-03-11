import type { RouteLocationNormalized } from 'vue-router';

export interface TabContentProps {
  tabItem: RouteLocationNormalized;
  type?: TabContentEnum;
  trigger?: ('click' | 'hover' | 'contextmenu')[];
}

export enum TabContentEnum {
  TAB_TYPE,
  EXTRA_TYPE,
}

export enum MenuEventEnum {
  // 刷新
  REFRESH_PAGE,
  // 关闭当前
  CLOSE_CURRENT,
  // 关闭左侧
  CLOSE_LEFT,
  // 关闭右侧
  CLOSE_RIGHT,
  // 关闭其他
  CLOSE_OTHER,
  // 关闭所有
  CLOSE_ALL,
}
