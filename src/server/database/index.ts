import * as mysql from 'mysql';
import { dbCredentials } from '../config';

const pool = mysql.createPool(dbCredentials);

export const Query = <t = mysql.OkPacket>(query: string, values?: unknown[]) => {
    return new Promise<t>((resolve, reject) => {

        pool.query(query, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};