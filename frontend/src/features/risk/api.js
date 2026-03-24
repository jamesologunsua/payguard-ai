import { post } from '../../shared/lib/http';

export function checkRisk(payload) {
  return post('/api/risk/check', payload);
}
