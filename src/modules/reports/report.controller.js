// report.controller.js

import * as reportService from "./report.service.js";

export const createReport = async (req, res) => {
  try {
    const report = await reportService.createReport(req.body);

    res.status(201).json({
      success: true,
      data: report
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};