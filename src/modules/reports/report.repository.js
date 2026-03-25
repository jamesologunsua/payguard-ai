// report.repository.js

import { db } from "../../shared/db/index.js";

export const createReport = async (data) => {
  const query = `
    INSERT INTO reports (account_number, scam_type, amount, description)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  const values = [
    data.account_number,
    data.scam_type,
    data.amount,
    data.description
  ];

  const { rows } = await db.query(query, values);

     if (!rows || rows.length === 0) {
      return null;
   }

return rows[0];
  
  
};

export const getReportsByAccount = async (accountNumber) => {
  const { rows } = await db.query(
    `SELECT * FROM reports WHERE account_number = $1`,
    [accountNumber]
  );

  return rows || [];
};