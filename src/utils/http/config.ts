// axios基础配置文件
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ContentTypeEnum, RequestEnum, ResultEnum } from '@/enums/httpEnum';
import { AxiosTransform, CreateAxiosOptions, RequestOptions, Result } from './types';
import store from '@/store';
import { checkStatus } from './checkStatus';
import { isString } from 'lodash-es';
import { createNow, formatRequestDate } from './utils';
import { setObjToUrlParams } from '@/utils/utils';
import { useMessage } from '@/hooks/useMessage';

const { createMessage, createErrorModal, notification } = useMessage();

const transform: AxiosTransform = {
  // 处理请求前的配置
  beforeRequest: (config: AxiosRequestConfig, options: RequestOptions) => {
    const { joinParamsToUrl, formatDate, joinTime = true } = options;

    const params = config.params || {};

    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, createNow(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${createNow(joinTime, true)}`;
        config.params = undefined;
      }
    } else if (config.method?.toUpperCase() === RequestEnum.POST) {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        config.data = params;
        config.params = undefined;
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url as string, config.data);
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },
  // 请求成功处理
  requestSuccess: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformRequestResult } = options;
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformRequestResult) {
      return res.data;
    }
    const { data } = res;
    if (!data) {
      return;
    }
    const { code, data: result, message } = data;

    const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS;

    if (!hasSuccess) {
      if (message) {
        switch (options.errorMessageMode) {
          case 'modal':
            createErrorModal({ title: '错误提示', content: message });
            break;
          case 'message':
            createMessage.error(message);
          case 'notification':
            notification.error({ message: '错误提示', description: message });
          default:
        }
      }
      Promise.reject(message);
      return;
    }

    // 接口请求成功，直接返回结果
    if (code === ResultEnum.SUCCESS) {
      return result;
    }

    // 接口请求错误，统一提示错误信息 具体业务具体添加
  },
  // 请求失败处理
  requestCatch: (error: Error) => {
    return error;
  },
  //请求之前的拦截器
  requestInterceptors: (config: AxiosRequestConfig) => {
    const token = store.state.app.token;
    if (token) {
      // jwt token
      config.headers.Authorization = 'Bearer' + token;
    }
    return config;
  },
  // 请求之前的拦截器错误处理
  requestInterceptorsCatch: (error: Error) => {
    return Promise.reject(error);
  },
  // 请求之后的拦截器错误处理
  responseInterceptorsCatch: (error: AxiosError<any>) => {
    const { response, code } = error;
    const msg: string = response?.data?.message ?? '';
    checkStatus(Number(code), msg);
    return Promise.reject(error);
  },
};

// 默认配置
export const axiosConfig: CreateAxiosOptions = {
  // 指定请求超时的毫秒数
  timeout: 10 * 1000,
  // 基础接口地址
  baseURL: import.meta.env.VITE_API_URL as string,
  // 请求头
  headers: { 'Content-Type': ContentTypeEnum.JSON },
  // 数据处理方式
  transform,
  // 请求配置项目
  requestOptions: {
    // 是否处理请求结果
    isTransformRequestResult: true,
    // post请求的时候添加参数到url
    joinParamsToUrl: false,
    // 消息提示类型
    errorMessageMode: 'message',
    // 格式化提交参数时间
    formatDate: true,
    //  是否加入时间戳
    joinTime: true,
  },
};
