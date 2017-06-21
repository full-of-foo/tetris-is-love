import Promise from 'bluebird';
import mongoose from './utils/mongoose';
import {getSafePassword} from '../lib/password';
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

UserSchema.statics.safeUpdate = function _safeUpdate(data) {
    return new Promise((resolve, reject) => {
        const payload = Object.assign({}, data);
        if(payload.password) payload.password = getSafePassword(payload.password);

        const filter = payload._id ? {_id: payload._id} : {};
        this.findOneAndUpdate(filter, payload, {new: true, upsert: true}, (err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};

export default mongoose.model('User', UserSchema);
