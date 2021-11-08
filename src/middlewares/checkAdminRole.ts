import { Response, Request, NextFunction} from "express";
import { Account } from "../models/account";

export const checkForAdminRole = async (req: Request, res: Response, next: NextFunction) => {
    const accountId = req.headers.authorization?.trim();
    const accounts = await Account.getAll();
    const currentAccount = accounts.find(account => account.id === accountId);
    if(!currentAccount || !currentAccount.isAdmin) return res.status(403).json({ message: "Нет доступа к апишке" });
    next();
}