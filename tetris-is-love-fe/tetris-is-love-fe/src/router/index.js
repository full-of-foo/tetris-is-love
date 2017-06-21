import Router from 'vue-router';
import Home from '@/components/home/Home.vue';
import Login from '@/components/login/Login.vue';
import Profile from '@/components/profile/Profile.vue';
import {requiresSession, requiresNoSession} from '@/router/handlers';

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        }, {
            path: '/login',
            name: 'Login',
            component: Login,
            beforeEnter: requiresNoSession,
        }, {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            beforeEnter: requiresSession,
        }
    ]
});

export default router;
