import User from '../../../app/models/user';
import data from '../../support/mocks/user.json';
import {jasmineErrorHandler} from '../../support/helpers/error';

describe('Model: User', () => {
    it('should be queryable', done => {
        User.find((err, users) => expect(users).toBeTruthy())
            .catch(err => jasmineErrorHandler(err, done))
            .finally(done);
    });

    it('should have required fields', done => {
        User.safeCreate({})
            .then(user => expect(user).not.toBeDefined())
            .catch(err => {
                expect(err).toBeTruthy();
                expect(err.name).toBe('ValidationError');
            })
            .finally(done);
    });

    it('should be updatable and deletable', done => {
        User.safeCreate(data)
            .then(u => expect(u._id).toBeTruthy())
            .then(() => User.findOneAndRemove()
                            .then(() => User.count((_, n) => expect(n).toEqual(0))))
            .catch(err => jasmineErrorHandler(err, done))
            .finally(done);

    });

    it('should create a hashed password', done => {
        User.safeCreate(data)
            .then(u => {
                expect(u.password.length).toBe(60);
                expect(u.password).not.toEqual(data.password);
            })
            .catch(err => jasmineErrorHandler(err, done))
            .finally(done);
    });
});
