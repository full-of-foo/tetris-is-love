import {Router} from 'express';
import {User} from '../../models';
import {generateToken} from '../../lib/authToken';
import UserAuthenticator from '../../lib/UserAuthenticator';

const authRouter = Router();
const _respondWithInvalid = res => res.status(422).send({});

authRouter.route('/login/')
    .post((req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const hasAuthHeaders = req.headers && req.headers.authorization;
        if(hasAuthHeaders || !email || !password) return _respondWithInvalid(res);

        User.findOne({email: email}).exec()
            .then(user => {
                const isValid = user && new UserAuthenticator(user).authenticate(password);
                if(!isValid) return _respondWithInvalid(res);

                res.status(201).send({user: user, token: generateToken(user._id)});
            })
            .error(err => _respondWithInvalid(res));
    });

export default authRouter;
