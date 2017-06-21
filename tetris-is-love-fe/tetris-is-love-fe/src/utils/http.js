import axios from 'axios';
import router from '@/router';
import constants from '@/utils/constants';
import SessionSingleton from '@/services/SessionSingleton';

const config = {
    baseURL: constants.urls.base,
    timeout: 1000,
};

const resErrorInterceptor = err => {
    if(err.response.status === 401) {
        SessionSingleton.instance.logout();
        router.push('/');
    }
    return Promise.reject(err);
};

export default (hasAuth = true) => {
    if(hasAuth) config.headers = SessionSingleton.instance.getAuthHeader();
    const http = axios.create(config);

    http.interceptors.response.use(res => res, resErrorInterceptor);
    return http;
};
