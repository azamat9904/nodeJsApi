import express from "express";
import * as accountController from "../controllers/account";
import { checkForAdminRole } from "../middlewares/checkAdminRole";

const router = express.Router();

router.get("", accountController.getAccount);
router.post("", accountController.createAccount);
router.put("", accountController.updateAccount);
router.delete("", checkForAdminRole, accountController.deleteAccount);

export default  router;

