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

const CONNECTION_PROBLEMS_STATUS_CODE = 502;

const ADD_AIRLINE_PROCEDURE = "add_airline";


export let DatabaseRouter = Express.Router();

DatabaseRouter.get('/flights', (req, res)=>{
    const params = req.query;

    makeQuery(createSearchFlightsQuery(params, FLIGHTS_VIEW_NAME))
    .then(result => res.send(result.recordset))
    .catch(error => {
        if(error.name == 'RequestError'){
            makeQuery(createSearchFlightsQuery(params, PARTIAL_FLIGHTS_VIEW_NAME))
            .then(result => res.send(result.recordset))
            .catch(error => res.status(CONNECTION_PROBLEMS_STATUS_CODE).send())
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
            .catch(error => res.status(CONNECTION_PROBLEMS_STATUS_CODE).send(error));
})


DatabaseRouter.get('/flights/:cityName', (req, res)=>{
    const requestedAirportName: string = req.params['cityName'];

   makeQuery(createSearchFlightsQueryForSpecificAirport(requestedAirportName.toLowerCase().toLowerCase(), FLIGHTS_VIEW_NAME))
   .then(result => res.send(result.recordset))
    .catch(error => {
        if(error.name == 'RequestError'){
            makeQuery(createSearchFlightsQueryForSpecificAirport(requestedAirportName, PARTIAL_FLIGHTS_VIEW_NAME))
            .then(result => res.send(result.recordset))
            .catch(error => res.status(CONNECTION_PROBLEMS_STATUS_CODE).send())
        }
    })
});

DatabaseRouter.post('/airline', (req, res)=>{
    new mssql.ConnectionPool(config).connect()
    .then(pool => pool.request()
            .input("name", req.params["name"].toLowerCase())
            .input("alias", req.params["alias"].toLowerCase())
            .input("country", req.params["country"].toLowerCase())
            .execute(ADD_AIRLINE_PROCEDURE))
            .then(result =>res.send(result.returnValue))
            .catch(error => {
                console.log(error)
                res.status(CONNECTION_PROBLEMS_STATUS_CODE).send(error)
            });
})

DatabaseRouter.post('/airport', (req, res)=>{
    new mssql.ConnectionPool(config).connect()
    .then(pool => pool.request()
            .input("name", req.params["name"])
            .input("city", req.params["city"])
            .input("country", req.params["country"])
            .input("timezone", req.params["timezone"])
            .input("lattitude", req.params["lattitude"])
            .input("longitude", req.params["longtitude"])
            .input("altitude", req.params["altitude"])
            .execute('add_airport'))
            .then(result =>res.send(result.returnValue))
            .catch(error => res.status(CONNECTION_PROBLEMS_STATUS_CODE).send(error));
})

DatabaseRouter.post('/flight', (req, res)=>{
    new mssql.ConnectionPool(config).connect()
    .then(pool => pool.request()
            .input("airlineName", req.params["airlineName"])
            .input("departureAirportName", req.params["departureAirportName"])
            .input("departureAirportCity", req.params["departureAirportCity"])
            .input("departureAirportCountry", req.params["departureAirportCountry"])
            .input("destinationAirportName", req.params["destinationAirportName"])
            .input("destinationAirportCity", req.params["destinationAirportCity"])
            .input("destinationAirportCountry", req.params["destinationAirportCountry"])
            .input("departureDate", req.params["departureDate"])
            .input("arrivalDate", req.params["arrivalDate"])
            .execute('add_flight'))
            .then(result =>res.send(result.returnValue))
            .catch(error => {
                console.log(error)
                res.status(CONNECTION_PROBLEMS_STATUS_CODE).send(error)
            });
})

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