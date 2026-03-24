import { post } from '../../shared/lib/http';

export function pay(payload) {
  return post('/api/risk/pay', payload);
}
