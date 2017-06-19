import bcrypt from 'bcryptjs';

export default class UserAuthenticator {
    constructor(user) {
        this.user = user;
    }

    authenticate(password) {
        if(!password || !this.user.password) return false;
        return bcrypt.compareSync(password, this.user.password);
    }
}
