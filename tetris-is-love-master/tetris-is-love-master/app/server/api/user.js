import {Router} from 'express';
import {User, mongoose} from '../../models';
import {generateToken} from '../../lib/authToken';
import UserAuthenticator from '../../lib/UserAuthenticator';
import {getSafePassword} from '../../lib/password';

const userRouter = Router();
const ValidationError = mongoose.Error.ValidationError;
const CastError = mongoose.Error.CastError;

userRouter.route('/')
    .get((req, res) => {
        User.find({}).sort('-createdAt').exec()
            .then(users => res.send(users))
            .error(err => res.status(500).send(err));
    }).
    post((req, res) => {
        if(req.headers && req.headers.authorization) res.status(422).send({});

        User.safeUpdate(req.body)
            .then(user => res.status(201).send({user: user, token: generateToken(user._id)}))
            .catch(ValidationError, err => res.status(422).send(err))
            .error(err => res.status(500).send(err));
    });
userRouter.route('/:id')
    .get((req, res) => {
        User.findOne({_id: req.params.id}).exec()
            .then(user => {
                if(!user) res.status(404).send({});
                res.send(user);
            })
            .catch(CastError, err => res.status(404).send({}))
            .error(err => res.status(500).send(err));
    })
    .put((req, res) => {
        const isCurrentUser = req.currentUser._id.toString() === req.params.id;
        const hasFullBody = [req.body.password, req.body.newPassword]
                                .every(attr => typeof attr === 'string' && attr.length > 0);
        console.log(isCurrentUser, hasFullBody, !isCurrentUser || !hasFullBody);
        if(!isCurrentUser || !hasFullBody) return res.status(422).send({});

        User.findOne({_id: req.params.id}).exec()
            .then(user => {
                if(!user) res.status(404).send({});
                if(!new UserAuthenticator(user).authenticate(req.body.password)) return res.status(422).send({});

                req.body.password = req.body.newPassword;
                ['createdAt', 'updatedAt'].forEach(k => delete req.body[k]);

                User.safeUpdate(req.body)
                    .then(user => res.send(user))
                    .catch(ValidationError, err => res.status(422).send(err))
                    .error(err => res.status(500).send(err));
            })
            .catch(CastError, err => res.status(404).send({}))
            .error(err => res.status(500).send(err));
    });

export default userRouter;
