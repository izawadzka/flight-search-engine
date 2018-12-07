import * as Express from 'express';
import * as mssql from 'mssql';

const config = {
    user: "sa",
    password: "Magda",
    database: "flight_search_engine",
    server: 'localhost',
    port:1433
};

const FLIGHTS_VIEW_NAME = "vi_flights";
const PARTIAL_FLIGHTS_VIEW_NAME = "vi_partial_flights";


export let DatabaseRouter = Express.Router();

DatabaseRouter.get('/', (req, res)=>{
    const pool = new mssql.ConnectionPool(config).connect();
    pool.then(()=>console.log("Success!")).catch((error)=>console.log(error));
    res.send();
});

DatabaseRouter.get('/flights', (req, res)=>{
    const params = req.query;

    makeQuery(createSearchFlightsQuery(params, FLIGHTS_VIEW_NAME))
    .then(result => res.send(result.recordset))
    .catch(error => {
        if(error.name == 'RequestError'){
            makeQuery(createSearchFlightsQuery(params, PARTIAL_FLIGHTS_VIEW_NAME))
            .then(result => res.send(result.recordset))
            .catch(error => res.status(502).send())
        }
    })
})


function makeQuery(query: string): Promise<mssql.IResult<any>>{
    return new mssql.ConnectionPool(config).connect()
    .then(pool=> pool.request().query(query))
}

function createSearchFlightsQuery(params: any, viewName: string): string{
    return  `select * from ${viewName} where departureCity=${params.departureCity} AND destinationCity=${params.destinationCity}`
}