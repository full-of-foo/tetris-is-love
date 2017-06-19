import moment from 'moment';
import jwt from 'jwt-simple';
import config from '../../config';

const generateToken = pubKey => {
    const playload = {
        exp: moment().add(config.tokenDayLife, 'days').unix(),
        iat: moment().unix(),
        sub: pubKey
    };
    return jwt.encode(playload, config.secret);
};

const decodeToken = token => {
    if(typeof token !== 'string' || token.split('.').length !== 3) return;

    try {
        const payload = jwt.decode(token, config.secret);
        if(moment().unix() > payload.exp) return;
        return payload;
    } catch(e) {
        console.error('Token Decode Error:', e);
        return;
    }
};

export {generateToken, decodeToken};
