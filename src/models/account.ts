import fs from "fs";
import path from "path";
import { accountType } from "../types/types";
import {readListFromFile} from "../helpers/readFromFile";

const filePath = path.join(__dirname, ".." , "data/db.json");

export class Account {

    constructor(private name: string, private age: number, private isAdmin: boolean) {}

    static getAll(): Promise<accountType[]>{
        return new Promise((resolve) => {
            readListFromFile(filePath, (list) => {
                resolve(list);
            });
        });
    }

    save(): Promise<accountType>{
        return new Promise( async (resolve, reject) => {
            const accounts = await Account.getAll();

            const isUserAlreadyExists = accounts.findIndex(account => account.name === this.name) !== -1;
            if(isUserAlreadyExists) return reject({ message: "Пользователь с таким именем уже существует", status: 400 });

            const randomId = Math.floor((Math.random()*1000000)+1).toString();
            const account = { id: randomId, name: this.name, age: this.age, isAdmin: this.isAdmin };
            accounts.push(account);

            fs.writeFile(filePath, JSON.stringify(accounts), (error) => {
                if(error) reject(error)
                resolve(account);
            });
        });
    }
    
    static update(id: string, updatedAccount: accountType): Promise<accountType> {
        return new Promise(async (resolve, reject) => {
            const accounts = await Account.getAll();

            const foundIndex = accounts.findIndex((account) => account.id === updatedAccount.id);
            if(foundIndex === -1) return reject({ message: "Не удалось найти пользователя", status: 404 });

            accounts[foundIndex] = updatedAccount;
            fs.writeFile(filePath, JSON.stringify(accounts), (error) => {
                if(error) reject(error);
                resolve(updatedAccount);
            });
        })
    }

    static delete(id: string): Promise<accountType>{
        return new Promise(async (resolve, reject) => {
            const accounts = await Account.getAll();
            const foundIndex = accounts.findIndex(account => account.id === id);
            if(foundIndex === -1) return reject({ message: "Не удалось найти такой аккаунт", status: 404 });

            const [deletedAccount] = accounts.splice(foundIndex, 1);

            fs.writeFile(filePath, JSON.stringify(accounts), (error) => {
                if(error) reject(error);
                resolve(deletedAccount);
            });
        })
    }
}