require('../support/BaseSpecHelper');
import createServer from '../../app/server';
import config from '../../config';
import mongoose from '../../app/models/utils/mongoose';

let app = null;

beforeEach(done => {
    app = createServer();
    if(mongoose.connection.readyState === 1) return done();

    mongoose.connect(config.dbUri, done);
});

afterEach(done => {
    mongoose.connection.db.dropDatabase(() => {
        app.server.close();
        mongoose.connection.close(done);
    });
});
