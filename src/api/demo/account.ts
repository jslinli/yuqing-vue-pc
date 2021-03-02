import request from '@/utils/http';
import { GetAccountInfoModel } from './model/accountModel';

enum Api {
  ACCOUNT_INFO = '/account/getAccountInfo',
}

export function accountInfoApi() {
  return request.request<GetAccountInfoModel>({
    url: Api.ACCOUNT_INFO,
    method: 'GET',
  });
}
