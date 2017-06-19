import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import errorhandler from 'errorhandler';
import compression from 'compression';
import morgan from 'morgan';
import Promise from 'bluebird';
import {isAuthenticatedMiddleware} from './middleware/auth';
import apiRouter from './api';
import config from '../../config';
import {db} from '../models';

const _buildAppMiddlewareAndRun = app => {
    app.use(cors({exposedHeaders: ['Link']}));
    app.use(bodyParser.json({limit : '100kb'}));
    app.use(compression());
    app.use(morgan(...config.logArgs));

    app.use('/api/*', isAuthenticatedMiddleware);
    app.use('/api', apiRouter);
    app.use(errorhandler());
    Promise.onPossiblyUnhandledRejection(err => console.error(err));

    app.server.listen(process.env.PORT || 8080);
    console.log(`Started on port ${app.server.address().port}`);
    return app;
};

const createServer = () => {
    const app = express();
    app.server = http.createServer(app);

    if(config.env === 'test') return _buildAppMiddlewareAndRun(app);
    return db(config, _buildAppMiddlewareAndRun(app));
};

export default createServer;
