// risk.service.js
import { verifyAccount } from "../interswitch/interswitch.service.js";
import * as reportService from "../reports/report.service.js";
import { analyzePatterns } from "../pattern/pattern.service.js";
import { getTrend } from "../trend/trend.service.js";
import { getLinkedAccounts } from "../network/network.service.js";
import { getSimilarCases } from "../similarity/similarity.service.js";
import { calculateRisk } from "./risk.engine.js";

export const checkRisk = async ({ account_number, amount, bank_code }) => {

  const verification = await verifyAccount(account_number, bank_code);

  let accountName = null;

  if (verification.isValid) {
    accountName = verification.accountName;
  } else {
    console.warn("Verification failed, continuing...");
    accountName = "Demo User"; // safe fallback for development/demo
  }

  // fraud checks
 const reports = (await reportService.getAccountReports(account_number)) || [];

  const pattern = analyzePatterns(reports);
  const trend = await getTrend(account_number);
  const network = await getLinkedAccounts(account_number);
  const similarity = await getSimilarCases({ reports, amount });

  const risk = calculateRisk({
    reports,
    pattern,
    trend,
    network,
    similarity,
    amount
  });

 
  return {
    ...risk,
    account_name: accountName || "Not verified"
  };
};