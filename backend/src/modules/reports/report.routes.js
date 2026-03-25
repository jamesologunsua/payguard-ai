// report.routes.js

import express from "express";
import * as controller from "./report.controller.js";

const router = express.Router();

router.post("/", controller.createReport);

export default router;