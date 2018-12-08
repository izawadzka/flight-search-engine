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

DatabaseRouter.post('/user', (req, res)=>{
    new mssql.ConnectionPool(config).connect()
    .then(pool => pool.request()
            .input("username", req.params["username"])
            .input("password", req.params["password"])
            .execute('add_user'))
            .then(result =>res.send(result.returnValue))
            .catch(error => res.status(400).send(error));
})


DatabaseRouter.get('/flights/:cityName', (req, res)=>{
    const requestedAirportName: string = req.params['cityName'];

   makeQuery(createSearchFlightsQueryForSpecificAirport(requestedAirportName.toLowerCase().toLowerCase(), FLIGHTS_VIEW_NAME))
   .then(result => res.send(result.recordset))
    .catch(error => {
        if(error.name == 'RequestError'){
            makeQuery(createSearchFlightsQueryForSpecificAirport(requestedAirportName, PARTIAL_FLIGHTS_VIEW_NAME))
            .then(result => res.send(result.recordset))
            .catch(error => res.status(502).send())
        }
    })
});

function makeQuery(query: string): Promise<mssql.IResult<any>>{
    return new mssql.ConnectionPool(config).connect()
    .then(pool=> pool.request().query(query))
}

function createSearchFlightsQuery(params: any, viewName: string): string{
    return  `select * from ${viewName} where departureCity = '${params.departureCity}' AND destinationCity = '${params.destinationCity}'`
}

function createSearchFlightsQueryForSpecificAirport(cityName: string, viewName: string){
    return `select * from ${viewName} where departureCity LIKE '%${cityName}' OR  destinationCity LIKE '%${cityName}'`
}