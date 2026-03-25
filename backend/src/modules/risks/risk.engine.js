// risk.engine.js

export const calculateRisk = ({
  reports,
  pattern,
  trend,
  network,
  similarity,
  amount
}) => {
  let score = 0;

  const total = reports?.length || 0;

 const recent = reports?.filter(
  r => new Date(r.reported_at) > Date.now() - 2 * 86400000
).length || 0;

  score += total * 2;
  score += recent * 5;
  score += (similarity?.count || 0) * 1.5;
if (pattern?.consistency > 0.6) score += 10;
if (trend?.isActive) score += 10;
if (network?.isLinked) score += 15;

  if (pattern.consistency > 0.6) score += 10;
  if (trend.isActive) score += 10;
  if (network.isLinked) score += 15;

  score += similarity.count * 1.5;

  if (amount > 100000) score += 5;

  let level = "LOW";
  if (score >= 50) level = "HIGH";
  else if (score >= 25) level = "MEDIUM";

  return {
    risk_level: level,
    risk_score: score,
    reports: { total, recent },
    pattern,
    trend,
    network,
    similarity,                                                                                                                                           
    message:
      level === "HIGH"
        ? "High risk account"
        : level === "MEDIUM"
        ? "Proceed with caution"
        : "Low risk"
  };
};