import SessionSingleton from '@/services/SessionSingleton';

const requiresSession = (to, from, next) => {
    if(!SessionSingleton.instance.token) return next(false);
    return next();
};

const requiresNoSession = (to, from, next) => {
    if(SessionSingleton.instance.token) return next(false);
    return next();
};

export {requiresSession, requiresNoSession};
