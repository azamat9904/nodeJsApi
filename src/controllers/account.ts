import { Request, Response } from 'express';
import { Account } from "../models/account";
import { accountType } from "../types/types";

export const getAccount = (req: Request, res: Response) => {
    Account.getAll().then(account => res.json({
        message: "Запрос успешно отработан",
        data: account
    }));
}

export const createAccount = async (req: Request, res: Response) => {
    const accountInfo: accountType = req.body;
    const accountInstance = new Account(accountInfo.name, accountInfo.age, accountInfo.isAdmin);

    try{
        const createdAccount: accountType = await accountInstance.save();

        res.json({
            message: "Данные успешно добавлены",
            data: createdAccount
        });

    }catch(error: any){
        if(!!error?.status)
            return res.status(error.status).json({ message: error.message });

        res.status(500).json({
            message: "Не удалось добавить данные",
            error
        });
    }
}

export const updateAccount = async (req: Request, res: Response) => {
    const id = req.body.id;
    const updatedAccount: accountType = req.body.updatedAccount;

    try{
        const updatedAccounts = await Account.update(id, updatedAccount);
        res.json({
            message: "Данные успешно обновились",
            data:updatedAccounts
        });

    }catch(error: any){
        if(!!error?.status)
            return res.status(error.status).json({ message: error.message });

        res.status(500).json({
            message: "Не удалось обновить данные пользователя",
            error
        });
    }
}

export const deleteAccount = async (req: Request, res: Response) => {
    const id = req.body.id;

    try{
        const deletedItem = await Account.delete(id);
        res.json({
            message: "Элемент успешно удален",
            data: deletedItem
        })

    }catch(error: any){

        if(!!error?.status)
            return res.status(404).json({ message: error.message });

        res.status(500).json({
            message: "Не удалось удалить данные пользователя",
            error
        });
    }

}

