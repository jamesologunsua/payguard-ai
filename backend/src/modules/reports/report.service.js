// report.service.js

import * as repo from "./report.repository.js";

export const createReport = async (data) => {
  return repo.createReport(data);
};

export const getAccountReports = async (accountNumber) => {
  return repo.getReportsByAccount(accountNumber);
};