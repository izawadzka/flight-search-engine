import {Server} from './server.class';
import { DatabaseRouter } from '../database.routers';

let server = new Server(8000);
server.addRoute('/api/database', DatabaseRouter);
server.start();