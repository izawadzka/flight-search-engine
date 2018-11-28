import * as Express from 'express';
import * as BodyParser from 'body-parser';
import * as cors from "cors";

const APP_NAME = "flights-search-engine";
const JS_FILES_DIR_NAME = "out-tsc";

export class Server {
    private app: Express.Application;
    private port: number;


    constructor(port: number) {
        this.port = port;
        this.app = Express();
        this.app.use(BodyParser.urlencoded({extended: false}));
        this.app.use(cors(corsOptions));
        this.app.use(Express.static(this.getDistributedDirPath()));
        this.app.use('/', Express.static(this.getDistributedDirPath()));
       this.getDistributedDirPath();
    }

    start(): void {   
        this.app.listen(this.port, () => {
            console.log('server started on port ' + this.port);
        });
    }

    getPort(): number {
        return this.port;
    }

    addRoute(mountPoint: string, router: Express.Router) {
        this.app.use(mountPoint, router);
    }

    getApp(): Express.Application{
        return this.app;
    }

    private getDistributedDirPath(): string{
        const endIndexOfMainPath = __dirname.lastIndexOf(JS_FILES_DIR_NAME);
        return __dirname.substring(0, endIndexOfMainPath) + APP_NAME;
    }
}

const corsOptions:cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", 'kbn-xsrf', 'Cookie'],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
  };
