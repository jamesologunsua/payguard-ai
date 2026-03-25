// network.service.js

import { db } from "../../shared/db/index.js";

export const getLinkedAccounts = async (accountNumber) => {
  const { rows } = await db.query(
    `SELECT * FROM account_links 
     WHERE account_number = $1 OR linked_account = $1`,
    [accountNumber]
  );

  return {
    isLinked: (rows || []).length > 0,
    count: (rows || []).length
  };
};