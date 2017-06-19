import Promise from 'bluebird';
import {User} from '../../models';
import userFactory from '../../../spec/support/helpers/userFactory';

export default () => {
    console.log('Seeding model data...');

    return User.count({}, (err, count) => {
        if(count > 0) return Promise.resolve(false);
        return userFactory.create();
    });
};
