import eventBus from '@/utils/eventBus';
import SessionSingleton from '@/services/SessionSingleton';
import router from '@/router';

export default {
    name: 'app',
    data() {
        return { sessionManager: SessionSingleton.instance };
    },
    methods: {
        toggleLeftSidenav() {
            this.$refs.leftSidenav.toggle();
        },
        logout() {
            this.sessionManager.logout();
            router.push('/');
        }
    },
    mounted() {
        eventBus.$on('user:login', sessionManager => {
            console.log(sessionManager);
        });
    }
};
