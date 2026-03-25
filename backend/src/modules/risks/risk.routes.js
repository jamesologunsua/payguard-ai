// risk.routes.js

import express from "express";
import * as controller from "./risk.controller.js";

const router = express.Router();

router.post("/check", controller.checkRisk);

export default router;