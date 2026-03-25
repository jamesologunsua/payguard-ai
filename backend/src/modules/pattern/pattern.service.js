// pattern.service.js

export const analyzePatterns = (reports) => {
  if (!reports || reports.length === 0) {
   return { consistency: 0 };
}

  const map = {};

  reports.forEach(r => {
    map[r.scam_type] = (map[r.scam_type] || 0) + 1;
  });

  const max = Math.max(...Object.values(map));

  return {
    dominant_type: Object.keys(map).find(k => map[k] === max),
    consistency: max / reports.length
  };
};