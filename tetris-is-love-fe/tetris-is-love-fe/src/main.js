import Vue from 'vue';
import Router from 'vue-router';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import 'material-design-lite';

import App from '@/components/app/App';
import router from '@/router';
import '@/main.css';

Vue.config.productionTip = false;
Vue.use(Router);
Vue.use(VueMaterial);

Vue.material.registerTheme('default', {
    primary: 'red',
    accent: 'blue',
    warn: 'deep-orange',
    background: 'white'
});

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
