import { post } from '../../shared/lib/http';

function normalizeRisk(data) {
  return {
    ...data,
    score: data?.risk_score ?? 0,
    reports: data?.reports?.total ?? 0,
    similar_cases: data?.similarity?.count ?? 0,
    network: data?.network?.isLinked ? 'YES' : 'NO',
    trend: data?.trend?.isActive ? 'ACTIVE' : 'CALM'
  }
}

export async function checkRisk(payload) {
  const response = await post('/api/risks/check', payload)
  const data = response?.data ?? response

  return normalizeRisk(data);
}
