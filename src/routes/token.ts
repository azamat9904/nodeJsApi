import express from "express";
import * as tokenController from "../controllers/token";

const router = express.Router();

router.get("", tokenController.getTokens);
router.post("", tokenController.createToken);
router.put("", tokenController.updateToken);
router.delete("", tokenController.deleteToken);
router.post("/byAccountName", tokenController.getTokensByAccountName);

export default router;