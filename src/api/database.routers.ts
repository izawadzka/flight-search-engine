import * as Express from 'express';
import * as mssql from 'mssql';
import dateformat = require('dateformat');

const config = {
    user: "sa",
    password: "Magda",
    database: "flight_search_engine",
    server: 'localhost',
    port:1433
};

const FLIGHTS_VIEW_NAME = "vi_flights";
const PARTIAL_FLIGHTS_VIEW_NAME = "vi_partial_flights";

const AIRLINES_VIEW_NAME = "vi_airlines";
const PARTIAL_AIRLINES_VIEW_NAME = "vi_partial_airlines";

const AIRPORTS_VIEW_NAME = "vi_airports";
const PARTIAL_AIRPORTS_VIEW_NAME = "vi_partial_airports";

const CONNECTION_PROBLEMS_STATUS_CODE = 502;

const ADD_AIRLINE_PROCEDURE = "add_airline";
const ADD_AIRPORT_PROCEDURE = "add_airport";
const ADD_USER_PROCEDURE = 'add_user';
const ADD_FLIGHT_PROCEDURE = "add_flight";
const DROP_FLIGHT_PROCEDURE = 'drop_flight';


export let DatabaseRouter = Express.Router();

DatabaseRouter.get('/flights', (req, res)=>{
    const params = req.query;

    makeQuery(createSearchFlightsQuery(params, FLIGHTS_VIEW_NAME))
    .then(result => {
        console.log(result)
        res.send(result.recordset)})
    .catch(error => {
        if(error.name == 'RequestError'){
            makeQuery(createSearchFlightsQuery(params, PARTIAL_FLIGHTS_VIEW_NAME))
            .then(result => res.send(result.recordset))
            .catch(error => res.status(CONNECTION_PROBLEMS_STATUS_CODE).send())
        }
    })
});

DatabaseRouter.get('/allflights', (req, res)=>{
    makeQuery(createSimpleSelect(FLIGHTS_VIEW_NAME))
    .then(result => res.send(result.recordset))
    .catch(error => {
        if(error.name == 'RequestError'){
            makeQuery(createSimpleSelect(PARTIAL_FLIGHTS_VIEW_NAME))
            .then(result => res.send(result.recordset))
            .catch(error => res.status(CONNECTION_PROBLEMS_STATUS_CODE).send())
        }
    })
})

DatabaseRouter.get('/airlines', (req, res)=>{
    makeQuery(createSimpleSelect(AIRLINES_VIEW_NAME))
    .then(result => res.send(result.recordset))
    .catch(error => {
        if(error.name == 'RequestError'){
            makeQuery(createSimpleSelect(PARTIAL_AIRLINES_VIEW_NAME))
            .then(result => res.send(result.recordset))
            .catch(error => res.status(CONNECTION_PROBLEMS_STATUS_CODE).send())
        }
    })
})

DatabaseRouter.get('/airports', (req, res)=>{
    makeQuery(createSimpleSelect(AIRPORTS_VIEW_NAME))
    .then(result => res.send(result.recordset))
    .catch(error => {
        if(error.name == 'RequestError'){
            makeQuery(createSimpleSelect(PARTIAL_AIRPORTS_VIEW_NAME))
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
            .execute(ADD_USER_PROCEDURE))
            .then(result =>res.send(res.send({"returnValue": result.returnValue})))
            .catch(error => res.status(CONNECTION_PROBLEMS_STATUS_CODE).send(error));
})

DatabaseRouter.get('/flights/:cityName', (req, res)=>{
    const requestedAirportName: string = req.params['cityName'];

   makeQuery(createSearchFlightsQueryForSpecificAirport(requestedAirportName.toUpperCase(), FLIGHTS_VIEW_NAME))
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
            .input("name", req.body["name"].toUpperCase())
            .input("alias", req.body["alias"].toUpperCase())
            .input("country", req.body["country"].toUpperCase())
            .execute(ADD_AIRLINE_PROCEDURE))
            .then(result => res.send({"returnValue": result.returnValue})) //verify!
            .catch(error => {
                console.log(error)
                res.status(CONNECTION_PROBLEMS_STATUS_CODE).send(error)
            });
})

DatabaseRouter.post('/airport', (req, res)=>{
    new mssql.ConnectionPool(config).connect()
    .then(pool => pool.request()
            .input("name", req.body["name"].toUpperCase())
            .input("city", req.body["city"].toUpperCase())
            .input("country", req.body["country"].toUpperCase())
            .input("timezone", req.body["timezone"].toUpperCase())
            .input("lattitude", +req.body["lattitude"])
            .input("longitude", +req.body["longitude"])
            .input("altitude", +req.body["altitude"])
            .execute(ADD_AIRPORT_PROCEDURE))
            .then(result => res.send({"returnValue": result.returnValue})) //verify!
            .catch(error => {
                console.log(error);
                res.status(CONNECTION_PROBLEMS_STATUS_CODE).send(error)
            });
})

DatabaseRouter.post('/flight', (req, res)=>{
    new mssql.ConnectionPool(config).connect()
    .then(pool => pool.request()
            .input("airlineName", req.body["airlineName"].toUpperCase())
            .input("departureAirportName", req.body["departureAirportName"].toUpperCase())
            .input("departureAirportCity", req.body["departureAirportCity"].toUpperCase())
            .input("departureAirportCountry", req.body["departureAirportCountry"].toUpperCase())
            .input("destinationAirportName", req.body["destinationAirportName"].toUpperCase())
            .input("destinationAirportCity", req.body["destinationAirportCity"].toUpperCase())
            .input("destinationAirportCountry", req.body["destinationAirportCountry"].toUpperCase())
            .input("departureDate", new Date(req.body["departureDate"]))
            .input("arrivalDate", new Date(req.body["arrivalDate"]))
            .execute(ADD_FLIGHT_PROCEDURE))
            .then(result => res.send({"returnValue": result.returnValue})) //verify!
            .catch(error => {
                console.log(error)
                res.status(CONNECTION_PROBLEMS_STATUS_CODE).send(error)
            });
})


DatabaseRouter.post('/deleteflight', (req, res)=>{
   new mssql.ConnectionPool(config).connect()
    .then(pool => pool.request()
            .input("flightId", +req.body["flightId"])
            .execute(DROP_FLIGHT_PROCEDURE))
            .then(result => res.send({"returnValue": result.returnValue})) //verify!
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
    const formattedDate = dateformat(params["departureDate"], 'yyyy-mm-dd')

    return  `select * from ${viewName} where departureCity = '${params.departureCity.toUpperCase()}'` +
     `AND destinationCity = '${params.destinationCity}'` +
     `AND CAST(departureDate AS DATE) = '${formattedDate}'`
}

function createSearchFlightsQueryForSpecificAirport(cityName: string, viewName: string){
    return `select * from ${viewName} where departureCity LIKE '%${cityName.toUpperCase()}' OR  destinationCity LIKE '%${cityName.toUpperCase()}'`
}

function createSimpleSelect(viewName: string){
    return `select * from ${viewName}`;
}