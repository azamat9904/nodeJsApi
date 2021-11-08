import fs from "fs";
import {tokenType} from "../types/types";
import path from "path";
import { readListFromFile } from "../helpers/readFromFile";

const filePath = path.join(__dirname, ".." , "data/token.json");

export class Token {
    constructor(private name: string, private token: string) {}

    static getAll(): Promise<tokenType[]>{
        return new Promise((resolve) => {
            readListFromFile(filePath, (list) => resolve(list));
        });
    }


    save(): Promise<tokenType>{
        return new Promise( async (resolve, reject) => {
            const tokens = await Token.getAll();

            const randomId = Math.floor((Math.random()*1000000)+1).toString();
            const token: tokenType = { id: randomId, name: this.name, token: this.token };
            tokens.push(token);

            fs.writeFile(filePath, JSON.stringify(tokens), (error) => {
                if(error) reject(error)
                resolve(token);
            });
        });
    }

    static update(id: string, updatedTokenInfo: tokenType): Promise<tokenType> {
        return new Promise(async (resolve, reject) => {
            const tokens = await Token.getAll();

            const foundIndex = tokens.findIndex((token) => token.id === updatedTokenInfo.id);
            if(foundIndex === -1) return reject({ message: "Не удалось найти такой токен", status: 404 });

            tokens[foundIndex] = updatedTokenInfo;
            fs.writeFile(filePath, JSON.stringify(tokens), (error) => {
                if(error) reject(error);
                resolve(updatedTokenInfo);
            });
        })
    }

    static delete(id: string): Promise<tokenType>{
        return new Promise(async (resolve, reject) => {
            const tokens = await Token.getAll();

            const foundIndex = tokens.findIndex(token => token.id === id);
            if(foundIndex === -1) return reject({ message: "Не удалось найти такой токен", status: 404 });

            const [ deletedToken ] = tokens.splice(foundIndex, 1);

            fs.writeFile(filePath, JSON.stringify(tokens), (error) => {
                if(error) reject(error);
                resolve(deletedToken);
            });
        })
    }

}