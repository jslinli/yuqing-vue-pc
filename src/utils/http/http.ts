// axios封装方法
import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreateAxiosOptions, RequestOptions, Result, UploadFileParams } from './types';
import { cloneDeep, isFunction } from 'lodash-es';
import { ContentTypeEnum } from '@/enums/httpEnum';
import { AxiosCanceler } from './cancel';

class Http {
  private axiosInstance: AxiosInstance;
  private readonly options: CreateAxiosOptions;
  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    // 加载axios拦截器
    this.setupInterceptors();
  }

  /**
   * 创建axios实例
   * @param config
   */
  private createAxios(config: CreateAxiosOptions): void {
    this.axiosInstance = axios.create(config);
  }

  /**
   * 设置拦截器
   */
  private setupInterceptors() {
    const transform = this.getTransform();
    if (!transform) {
      return;
    }
    const {
      requestInterceptors,
      responseInterceptors,
      requestInterceptorsCatch,
      responseInterceptorsCatch,
    } = transform || {};

    const axiosCanceler = new AxiosCanceler();

    // 添加请求拦截器
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      axiosCanceler.addPending(config);
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config);
      }
      return config;
    }, requestInterceptorsCatch);

    // 添加响应拦截器
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config);
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }
      return res;
    }, responseInterceptorsCatch);
  }

  /**
   * 获取数据处理方式
   */
  private getTransform() {
    const { transform } = this.options;
    return transform;
  }

  /**
   * 重新配置axios
   * @param config 配置
   */
  public configAxios(config: CreateAxiosOptions) {
    if (!this.axiosInstance) {
      return;
    }
    this.createAxios(config);
  }

  /**
   * 获取axios实例
   */
  public getAxios() {
    return this.axiosInstance;
  }

  /**
   * 设置头信息
   * @param header 添加的头部信息对象
   * @returns 返回是否设置成功
   */
  public setHeader(header: any): boolean {
    if (!this.axiosInstance) {
      return false;
    }
    Object.assign(this.axiosInstance.defaults.headers, header);
    return true;
  }

  // 上传文件
  public uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
    const formData = new window.FormData();

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data[key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
          return;
        }

        formData.append(key, params.data[key]);
      });
    }

    formData.append(params.name || 'file', params.file, params.filename);

    return this.axiosInstance.request<T>({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA,
        ignoreCancelToken: true,
      },
    });
  }

  // axios请求方法
  public request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: AxiosRequestConfig = cloneDeep(config);
    const transform = this.getTransform();
    const { beforeRequest, requestSuccess, requestCatch } = transform || {};

    const { requestOptions } = this.options;
    const opt: RequestOptions = Object.assign({}, requestOptions, options);

    if (beforeRequest && isFunction(beforeRequest)) {
      conf = beforeRequest(conf, opt);
    }

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (requestSuccess && isFunction(requestSuccess)) {
            const ret = requestSuccess(res, opt);
            return resolve(ret);
          }
          return resolve(res.data.data);
        })
        .catch((err: Error) => {
          if (requestCatch && isFunction(requestCatch)) {
            return reject(requestCatch(err));
          }
          return reject(err);
        });
    });
  }
}

export default Http;
