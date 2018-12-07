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

DatabaseRouter.get('/flights', (req, res)=>{
    const params = req.query;
    new mssql.ConnectionPool(config).connect()
    .then(pool=> pool.query `select * from vi_flights where departureCity=${params.departureCity} AND destinationCity=${params.destinationCity}`)
    .then(result => res.send(result.recordset))
    .catch(error => {
        console.log(error)
        if(error.name == 'RequestError'){
            new mssql.ConnectionPool(config).connect()
            .then(pool=> pool.query `select * from vi_partial_flights where departureCity=${params.departureCity} AND destinationCity=${params.destinationCity}`)
            .then(result => res.send(result.recordset))
            .catch(error => res.status(502).send())
        }
    })
})