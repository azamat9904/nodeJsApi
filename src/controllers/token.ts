import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import config from "../config/config";
import { Token } from "../models/token";

export const getTokens = async (req: Request, res: Response) => {
    const tokens = await Token.getAll();

    res.json({
        message: "Запрос успешно отработан",
        data: tokens
    });
};

export const deleteToken = async (req: Request, res: Response) => {
   try{
       const id = req.body.id;
       const deletedItem = await Token.delete(id);

       res.json({
           message: "Токен успешно удален",
           data: deletedItem
       });

   }catch(error: any){
       if(!!error?.status) return res.status(error.status).json({ message: error.message });

       res.status(500).json({
           message: "Не удалось удалить токен",
           error
       });
   }
}


export const updateToken = async (req: Request, res: Response) => {
    const id = req.body.id;
    const updatedTokenInfo = req.body.updatedTokenInfo;

    try{
        const updatedToken = await Token.update(id, updatedTokenInfo);
        res.json({
            message: "Информация о токене успешно обновлен",
            data: updatedToken
        });

    }catch(error:any){
        if(!!error?.status)
            return res.status(error.status).json({ message: error.message });

        res.status(500).json({
            message: "Не удалось обновить информацию токена",
            error
        })
    }
}

export const createToken = (req: Request, res: Response) => {
    const name = req.body.name;

    jwt.sign({ name }, config.SECRET_TOKEN, async (err: any, token: string | undefined) => {
        const defaultText =  "Не удалось сгенирировать токен";

        if(!token) return res.status(404).json({ message: defaultText });
        if(err) return res.status(500).json({ message: defaultText, error: err });

        try{
            const tokenInstance = new Token(name, token!);
            const generatedToken = await tokenInstance.save();
            res.json({
                message: "Токен успешно сгенирирован",
                data: generatedToken
            });

        }catch(error: any){
            if(!!error?.status)
                return res.status(error.status).json({ message: error.message });

            res.status(500).json({ message: defaultText, error });
        }
    });
}

export const getTokensByAccountName = async (req: Request, res: Response) => {
    try{
        const name = req.body.name;
        const tokens = await Token.getAll();
        const accountTokens = tokens.filter(token => token.name === name);

        res.json({
            message: "Запрос успешно отработан",
            data: accountTokens
        });

    }catch(error){
        res.status(500).json({
            message: "Не удалось загрузить токен",
            error
        });
    }
}