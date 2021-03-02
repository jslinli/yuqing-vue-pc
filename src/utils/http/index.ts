import Http from './http';
import { CreateAxiosOptions } from './types';
import { axiosConfig } from './config';
import { deepMerge } from '@/utils/utils';

function createHttp(opt?: Partial<CreateAxiosOptions>) {
  return new Http(deepMerge(axiosConfig, opt || {}));
}

export default createHttp();
