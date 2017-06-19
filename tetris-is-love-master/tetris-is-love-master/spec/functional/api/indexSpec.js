import request from 'request-promise';
import constants from '../../support/helpers/constants';
import {jasmineErrorHandler} from '../../support/helpers/error';

describe('API: index', () => {
    it('should return version and env', done => {
        request({uri: `${constants.baseUrl}/api`, json: true})
            .then(res => expect(Object.keys(res)).toEqual(['version', 'env']))
            .catch(err => jasmineErrorHandler(err, done))
            .finally(done);
    });
});
