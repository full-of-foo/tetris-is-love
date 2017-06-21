import {User} from '../../../app/models';
import mockData from '../mocks/user.json';

export default {
    create(data = {}) {
        return User.safeUpdate(Object.assign({}, data, mockData))
            .error(err => console.log(err));
    }
};
