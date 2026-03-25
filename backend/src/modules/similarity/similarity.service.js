// similarity.service.js

export const getSimilarCases = ({ reports, amount }) => {
  if (!reports || reports.length === 0) {
    return { count: 0 }; 
  }

  const similar = reports.filter(r => {
    return (
      r.amount >= amount * 0.8 &&
      r.amount <= amount * 1.2
    );
  });

  return {
    count: similar.length
  };
};