// axios封装用到的类型
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export type ErrorMessageMode = 'modal' | 'message' | 'notification';

export interface RequestOptions {
  // 是否处理请求结果
  isTransformRequestResult?: boolean;
  // post请求的时候添加参数到url
  joinParamsToUrl?: boolean;
  // 格式化请求参数时间
  formatDate?: boolean;
  // 错误消息提示类型
  errorMessageMode?: ErrorMessageMode;
  // 是否加入时间戳
  joinTime?: boolean;
}

export interface Result<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface AxiosTransform {
  /**
   * 请求之前处理配置
   */
  beforeRequest?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

  /**
   * 请求成功处理
   */
  requestSuccess?: (res: AxiosResponse<Result>, options: RequestOptions) => any;

  /**
   * 请求失败处理
   */
  requestCatch?: (error: Error) => any;

  /**
   * 请求之前的拦截器
   */
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;

  /**
   * 请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  /**
   * 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: Error) => void;

  /**
   * 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (error: AxiosError) => void;
}

export interface CreateAxiosOptions extends AxiosRequestConfig {
  transform?: AxiosTransform;
  requestOptions: RequestOptions;
}

export interface UploadFileParams {
  // 其他参数
  data?: any;
  // 文件参数的接口字段名
  name?: string;
  // 文件
  file: File | Blob;
  // 文件名
  filename?: string;
  [key: string]: any;
}
