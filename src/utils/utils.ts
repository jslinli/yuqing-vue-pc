import { isObject } from 'lodash-es';

/**
 * 根据数组中某个对象值去重
 */
export function unique<T = any>(arr: T[], key: string): T[] {
  const map = new Map();
  return arr.filter((item) => {
    const _item = item as any;
    return !map.has(_item[key]) && map.set(_item[key], 1);
  });
}

/**
 * es6非对象数组去重复
 */
export function es6Unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * 将对象作为参数添加到URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  let url = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  if (/\?$/.test(baseUrl)) {
    url = baseUrl + parameters;
  } else {
    url = baseUrl.replace(/\/?$/, '?') + parameters;
  }
  return url;
}

/**
 * 深度合并操作
 */
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

/**
 * 得到最后一个元素
 */
export function getLastItem<T extends any>(list: T) {
  if (Array.isArray(list)) {
    return list.slice(-1)[0];
  }

  if (list instanceof Set) {
    return Array.from(list).slice(-1)[0];
  }

  if (list instanceof Map) {
    return Array.from(list.values()).slice(-1)[0];
  }
}

/**
 * 将秒数换成时分秒格式
 * @param value 秒数
 * @param withDay 是否带天数倒计
 */
export function formatSecond(value: number, withDay = false) {
  let day: number | string = Math.floor(value / (24 * 3600));
  let hour: number | string = Math.floor(value / 3600) - day * 24;
  let minute: number | string = Math.floor(value / 60) - day * 24 * 60 - hour * 60;
  let second: number | string = Math.floor(value) - day * 24 * 3600 - hour * 3600 - minute * 60;
  if (!withDay) {
    hour = hour + day * 24;
  }
  // 格式化
  day = day < 10 ? ('0' + day).slice(-2) : day.toString();
  hour = hour < 10 ? ('0' + hour).slice(-2) : hour.toString();
  minute = ('0' + minute).slice(-2);
  second = ('0' + second).slice(-2);
  return { day, hour, minute, second };
}

/**
 * 点击复制
 * @param text 复制的内容
 * @param success 成功回调
 * @param fail 出错回调
 */
export function copyText(text: string, success?: () => void, fail?: (res: string) => void) {
  text = text.replace(/(^\s*)|(\s*$)/g, '');
  if (!text) {
    fail && fail('复制的内容不能为空！');
    return;
  }
  const id = 'the-clipboard';
  let clipboard = document.getElementById(id) as HTMLTextAreaElement;
  if (!clipboard) {
    clipboard = document.createElement('textarea');
    clipboard.id = id;
    clipboard.readOnly = true;
    clipboard.style.cssText = 'font-size: 15px; position: fixed; top: -1000%; left: -1000%;';
    document.body.appendChild(clipboard);
  }
  clipboard.value = text;
  clipboard.select();
  clipboard.setSelectionRange(0, clipboard.value.length);
  document.execCommand('copy');
  const state = document.execCommand('copy');
  if (state) {
    success && success();
  } else {
    fail && fail('复制失败');
  }
}

/**
 * 写入并下载文件
 * @param filename 文件名
 * @param content 文件内容
 */
export function download(filename: string, content: string) {
  const link = document.createElement('a');
  link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  link.setAttribute('download', filename);
  if (document.createEvent) {
    const event = document.createEvent('MouseEvents');
    event.initEvent('click', true, true);
    link.dispatchEvent(event);
  } else {
    link.click();
  }
}

/**
 * 判断是否外部链接
 * @param path 路径
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * 设置网页的标题
 * @param title 主标题名称
 * @param appTitle 副标题名称
 */
export function setTitle(title: string, appTitle?: string) {
  const _title = appTitle ? `${title}-${appTitle}` : title;
  document.title = _title;
}
