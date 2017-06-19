import request from 'request-promise';
import constants from '../../support/helpers/constants';
import userFactory from '../../support/helpers/userFactory';
import {generateToken} from '../../../app/lib/authToken';
import {jasmineErrorHandler} from '../../support/helpers/error';
import {assertResUnprocessable} from '../../support/helpers/assertions';

const validCredData = {body: {email: 'foo@bar.com', password: 'pew'}};
const defaultReqOpts = {
    json: true,
    uri: `${constants.baseUrl}/api/auth/login/`,
    method: 'POST',
    resolveWithFullResponse: true,
};
let authHeaderOpt = null;

describe('API: auth', () => {
    beforeEach(done => {
        userFactory.create()
            .then(user => {
                const token = generateToken(user._id);
                authHeaderOpt = Object.assign(defaultReqOpts, new Object({auth: {bearer: token}}));
            })
            .catch(err => jasmineErrorHandler(err, done))
            .finally(done);
    });

    it('should not be able to POST login with incomplete creds', done => {
        request(Object.assign({body: {email: 'pew'}}, defaultReqOpts))
            .then(res => assertResUnprocessable(res))
            .then(res => request(Object.assign({body: {password: 'pew'}}, defaultReqOpts)))
            .then(res => assertResUnprocessable(res))
            .finally(done);
    });

    it('should not be able to POST login with incorrect creds', done => {
        request(Object.assign({body: {email: 'foo@bar.com', password: 'nope'}}, defaultReqOpts))
            .then(res => assertResUnprocessable(res))
            .then(res => request(Object.assign({body: {email: 'nope', password: 'pew'}}, defaultReqOpts)))
            .then(res => assertResUnprocessable(res))
            .finally(done);
    });

    it('should not be able to POST login when already logged in', done => {
        request(Object.assign(authHeaderOpt, validCredData, defaultReqOpts))
            .then(res => assertResUnprocessable(res))
            .finally(done);
    });

    it('should be able POST login', done => {
        request(Object.assign(validCredData, defaultReqOpts))
            .then(res => {
                expect(res.statusCode).toEqual(201);
                expect(Object.keys(res.body).toEqual(['user', 'token']));
            })
            .finally(done);
    });
});
