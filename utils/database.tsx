import * as SQLite from 'expo-sqlite';
import Site from "../models/Site";

const database = SQLite.openDatabase("sites.db");

export function init() {
    return new Promise<void>((resolve, reject) => {
        database.transaction((tx) => {

            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS sites (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,    
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                lng REAL NOT NULL
            )`,
                [],
                () => {
                    console.log('DB READY')
                    resolve();
                },
                // @ts-ignore
                (_, error) => {
                    reject(error);
                }
            );
        })
    })
}


export function insertSite(site) {
    return new Promise((resolve, reject) => {
        const {title, imageUri, address, location} = site;
        const {lat, lng} = location;
        database.transaction(tx => {
            tx.executeSql(
                `INSERT INTO sites (title,imageUri,address,lat,lng) VALUES (?, ?, ?, ?, ?)`,
                [title, imageUri, address || "-", lat, lng],
                (_, resultSet)=>{
                    //const { insertId } = resultSet;
                    console.log(resultSet);
                    resolve(resultSet);
                },
                // @ts-ignore
                (_,error) => reject(error)
            );
        })
    })
}


export function fetchSites() {
    return new Promise<any>((resolve, reject) => {
        database.transaction(tx=>{
            tx.executeSql(
                `SELECT * FROM sites`,
                [],
                (_,result)=>{
                    const sites = [];
                    for(const dp of result.rows._array){
                        sites.push(
                            new Site(
                                dp.title,
                                dp.imageUri,
                                {
                                    address: dp.address,
                                    lat: dp.lat,
                                    lng: dp.lng
                                },
                                dp.id
                            )
                        )
                    }
                    resolve(sites);
                },
                (_,error) => {
                    reject(error);
                    return true;
                }
            );
        })
    })
}

export function findSite(id) {
    return new Promise<any>((resolve, reject) => {
        database.transaction(tx=>{
            tx.executeSql(
                "SELECT * FROM sites WHERE id=?",
                [id],
                (_,resultSet) => {
                    const dp = resultSet.rows._array[0];
                    resolve(new Site(
                        dp.title,
                        dp.imageUri,
                        {
                            lat: dp.lat,
                            lng: dp.lng,
                            address: dp.address
                        },
                        dp.id
                    ))
                },
                (_,error) => {
                    reject(error);
                    return false;
                }
            )
        })
    })
}