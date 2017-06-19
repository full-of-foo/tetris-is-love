import UserAuthenticator from '../../../app/lib/UserAuthenticator';
import User from '../../../app/models/user';

const userData = {
    email: 'foo@bar.com',
    password: 'pew',
};
const badUserAuthenticator = new UserAuthenticator({});
const invalidUserAuthenticator = new UserAuthenticator({password: 'nope'});

describe('Lib: UserAuthenticator', () => {
    it('should be able to authenticate', done => {
        expect(badUserAuthenticator.authenticate('')).toBe(false);
        expect(badUserAuthenticator.authenticate(null)).toBe(false);
        expect(badUserAuthenticator.authenticate(userData.password)).toBe(false);
        expect(invalidUserAuthenticator.authenticate(userData.password)).toBe(false);

        User.safeCreate(userData)
            .then(u => expect(new UserAuthenticator(u).authenticate(userData.password)).toBe(true))
            .finally(done);
    });
});
