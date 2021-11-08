import {accountType} from "../types/types";
import fs from "fs";

export const readListFromFile = (filePath: string, success: (list: any ) => void) => {
    fs.readFile(filePath, (error, data) => {
        if(error || !data.toString()){
            success([])
            return;
        }
        const dataList = JSON.parse(Buffer.from(data).toString());
        success(dataList);
    })
}