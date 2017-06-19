import request from 'request-promise';
import constants from '../../support/helpers/constants';
import userFactory from '../../support/helpers/userFactory';
import {generateToken} from '../../../app/lib/authToken';
import {jasmineErrorHandler} from '../../support/helpers/error';
import {assertResNotFound, assertResUnprocessable} from '../../support/helpers/assertions';

const expectedAttrs = ['_id', 'updatedAt', 'createdAt', 'email'];
const putData = {email: 'new@pew.com', password: 'pew'};
let defaultReqOpts = {json: true};
let seedUser = null;

describe('API: user', () => {
    beforeEach(done => {
        userFactory.create()
            .then(user => {
                const token = generateToken(user._id);
                defaultReqOpts = Object.assign(defaultReqOpts, new Object({auth: {bearer: token}}));
                seedUser = user;
            })
            .catch(err => jasmineErrorHandler(err, done))
            .finally(done);
    });

    it('should be able to GET all', done => {
        const reqOpts = Object.assign({uri: `${constants.baseUrl}/api/user`}, defaultReqOpts);

        request(reqOpts)
            .then(users => expect(users.length).toEqual(1))
            .then(() => userFactory.create())
            .then(user => request(reqOpts))
            .then(users => {
                expect(users.length).toEqual(2);
                expect(Object.keys(users[1])).toEqual(expectedAttrs);
            })
            .catch(err => jasmineErrorHandler(err, done))
            .finally(done);
    });

    it('should be able to GET one', done => {
        request(Object.assign({uri: `${constants.baseUrl}/api/user/${seedUser._id}`}, defaultReqOpts))
            .then(user => expect(Object.keys(user)).toEqual(expectedAttrs))
            .catch(err => jasmineErrorHandler(err, done))
            .finally(done);
    });

    it('should be able to GET 404s', done => {
        const _reqUser = id => {
            const opts = {uri: `${constants.baseUrl}/api/user/${id}`, resolveWithFullResponse: true};
            const fullReqOpts = Object.assign(opts, defaultReqOpts);
            return request(fullReqOpts);
        };

        _reqUser('123')
            .then(res => assertResNotFound(res))
            .then(() => _reqUser('59469241a5129e000fbe8d61'))
            .then(res => assertResNotFound(res))
            .then(() => _reqUser('123'))
            .then(res => assertResNotFound(res))
            .finally(done);
    });

    it('should be able to PUT one\'s self', done => {
        const uri = `${constants.baseUrl}/api/user/${seedUser._id}`;
        const opts = Object.assign({uri: uri, method: 'PUT', body: putData}, defaultReqOpts);

        request(opts)
            .then(user => expect(user.email).toEqual(putData.email))
            .catch(err => jasmineErrorHandler(err, done))
            .finally(done);
    });

    it('should not be able to PUT others', done => {
        const opts = Object.assign({method: 'PUT', body: putData, resolveWithFullResponse: true},
                                   defaultReqOpts);
        userFactory.create()
            .then(user => request(Object.assign({uri: `${constants.baseUrl}/api/user/${user._id}`}, opts)))
            .then(res => assertResUnprocessable(res))
            .finally(done);
    });
});
