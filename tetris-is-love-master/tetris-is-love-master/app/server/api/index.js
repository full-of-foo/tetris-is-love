import {Router} from 'express';
import config from '../../../config';
import userRouter from './user';
import authRouter from './auth';

const apiRouter = Router();

apiRouter.get('/', (req, res) => {
    res.status(200).send({
        version: config.version,
        env: config.env
    });
});

apiRouter.use('/user', userRouter);
apiRouter.use('/auth', authRouter);

export default apiRouter;
