import ls from 'local-storage';
import constants from '@/utils/constants';
import eventBus from '@/utils/eventBus';
import http from '@/utils/http';

class SessionManager {
    constructor() {
        this._setSession(ls('userSession'), ls('userToken'));
    }

    login(email, password) {
        const data = {email: email, password: password};
        return http(false).post(constants.urls.login, data)
            .then(res => {
                this._setSession(res.data.user, res.data.token);
                eventBus.$emit('user:login', this);
            });
    }

    logout() {
        this._setSession(null, null);
        eventBus.$emit('user:logout', this);
    }

    validateCurrentUser() {
        return new Promise((resolve, reject) => {
            if(!this.user || !this.token) reject(false);

            http().get(`${constants.urls.users}${this.user._id}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err));
        });
    }

    getAuthHeader() {
        return {
            Authorization: `Bearer ${this.token}`
        };
    }

    _setSession(user, token) {
        ls('userSession', user);
        ls('userToken', token);
        this.user = ls('userSession');
        this.token = ls('userToken');
    }
}

export default {
    instance: new SessionManager()
};
