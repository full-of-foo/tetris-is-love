import SessionSingleton from '@/services/SessionSingleton';

export default {
    data() {
        return {
            email: '',
            password: '',
            sessionManager: SessionSingleton.instance
        };
    },

    methods: {
        onSubmit() {
            // TODO - validate
            // TODO - propagate BE validation
            this.sessionManager
                .login(this.email, this.password)
                .then(res => this.$router.push('/'))
                .catch(err => console.error('Oops: ', err));
        }
    },

    mounted() {
        window.componentHandler.upgradeAllRegistered();
    }
};
