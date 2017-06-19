import Promise from 'bluebird';
import bcrypt from 'bcryptjs';
import mongoose from './utils/mongoose';
import {schemaOpts, addHelperFns} from './base';

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
}, schemaOpts);

UserSchema.set('toJSON', {
    getters: true,
    virtual: true,
    transform(doc, ret, options) {
        delete ret.password;
        return ret;
    }
});

addHelperFns(UserSchema);

UserSchema.statics.safeCreate = function _safeCreate(data) {
    return new Promise((resolve, reject) => {
        const payload = Object.assign({}, data);
        if(payload.password) {
            const salt = bcrypt.genSaltSync();
            payload.password = bcrypt.hashSync(payload.password, salt);
        }

        const user = new this(payload).save(err => {
            err ? reject(err) : resolve(user);
        });
    });
};

export default mongoose.model('User', UserSchema);
