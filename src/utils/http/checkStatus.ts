// 提示错误信息
import { useMessage } from '@/hooks/useMessage';
const { createMessage } = useMessage();

export function checkStatus(status: number, message: string): void {
  switch (status) {
    case 400:
      createMessage.error(message ?? '请求错误');
      break;
    case 401:
      createMessage.error(message ?? '未授权，请登录');
      break;
    case 403:
      createMessage.error(message ?? '拒绝访问');
      break;
    case 404:
      createMessage.error(message ?? '请求地址出错');
      break;
    case 408:
      createMessage.error(message ?? '请求错误');
      break;
    case 500:
      createMessage.error(message ?? '服务器内部错误');
      break;
    case 502:
      createMessage.error(message ?? '网关错误');
      break;
    case 503:
      createMessage.error(message ?? '服务不可用');
      break;
    case 504:
      createMessage.error(message ?? '网关超时');
      break;
    case 505:
      createMessage.error(message ?? 'HTTP版本不受支持');
      break;
    default:
      break;
  }
}
