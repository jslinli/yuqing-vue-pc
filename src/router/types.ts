import { defineComponent } from 'vue';

export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export interface RouteMeta {
  // 标题
  title?: string;
  // 导航icon
  icon?: string;
  // 是否隐藏导航目录
  hideMenu?: boolean;
  // 是否隐藏面包屑
  hideBreadcrumb?: boolean;
  // 是否标记为单层菜单
  single?: boolean;
  // 忽略keep-alive
  ignoreKeepAlive?: boolean;
  // 外部链接
  link?: string;
}
