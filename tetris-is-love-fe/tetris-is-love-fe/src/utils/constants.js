const API_URL = 'http://localhost:8080/api';

export default Object.freeze({
    urls: {
        base: API_URL,
        login: `${API_URL}/auth/login/`,
        signUp: `${API_URL}/user/`,
        users: `${API_URL}/user/`,
    }
});
