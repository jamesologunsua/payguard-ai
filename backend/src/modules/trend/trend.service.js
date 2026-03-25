// trend.service.js

import { db } from "../../shared/db/index.js";

export const getTrend = async (accountNumber) => {
  const { rows } = await db.query(
    `SELECT COUNT(*) FROM reports 
     WHERE account_number = $1 
     AND reported_at > NOW() - INTERVAL '24 hours'`,
    [accountNumber]
  );

  const count = parseInt(rows?.[0]?.count || 0);


  return {
    isActive: count > 5,
    reports_last_24h: count
  };
};