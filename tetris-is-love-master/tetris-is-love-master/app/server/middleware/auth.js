import {decodeToken} from '../../lib/authToken';
import {User, mongoose} from '../../models';

const CastError = mongoose.Error.CastError;

const _respondWithUnauth = res => res.status(401).send({});
const _respondWithInvalid = res => res.status(400).send({});

const _isSessionlessRoute = req => {
    return req.method === 'POST' && (req.originalUrl === '/api/auth/login/'
         || req.originalUrl === '/api/auth/user/');
};

const isAuthenticatedMiddleware = (req, res, next) => {
    if(_isSessionlessRoute(req)) return next();
    if(!req.headers || !req.headers.authorization) return _respondWithInvalid(res);
    const headerSplit = req.headers.authorization.split('Bearer ');
    if(headerSplit.length !== 2) return _respondWithInvalid(res);

    const tokenPayload = decodeToken(headerSplit[1]);
    if(!tokenPayload) return _respondWithInvalid(res);

    return User.findOne({_id: tokenPayload.sub}).exec()
        .then(user => {
            if(!user) return _respondWithUnauth(res);

            req.currentUser = user;
            next();
        })
        .catch(CastError, err => _respondWithUnauth(res))
        .error(err => _respondWithUnauth(res));
};

export {isAuthenticatedMiddleware};
