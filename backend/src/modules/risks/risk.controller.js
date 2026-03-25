// risk.controller.js

import * as riskService from "./risk.service.js";

export const checkRisk = async (req, res) => {
  try {
    const result = await riskService.checkRisk(req.body);

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};