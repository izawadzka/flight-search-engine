import * as Express from 'express';
import * as mssql from 'mssql';

const config = {
    user: "sa",
    password: "Magda",
    database: "flight_search_engine",
    server: 'localhost',
    port:1433
};


export let DatabaseRouter = Express.Router();

DatabaseRouter.get('/', (req, res)=>{
    const pool = new mssql.ConnectionPool(config).connect();
    pool.then(()=>console.log("Success!")).catch((error)=>console.log(error));
    res.send();
});