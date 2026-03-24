import { post } from '../../shared/lib/http';

export function submitReport(payload) {
  return post('/api/reports', payload);
}
