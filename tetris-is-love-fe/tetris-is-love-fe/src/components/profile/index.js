import http from '@/utils/http';
import constants from '@/utils/constants';
import SessionSingleton from '@/services/SessionSingleton';

export default {
    data() {
        return {
            loading: false,
            user: null,
            form: {
                password: '',
                newPassword: '',
            },
            sessionManager: SessionSingleton.instance
        };
    },

    created() {
        this.fetchUser();
    },

    watch: {
        $route: 'fetchData'
    },

    methods: {
        fetchUser() {
            this.loading = true;
            this.sessionManager.validateCurrentUser()
                .then(user => {
                    this.user = user;
                    this.loading = false;
                })
                .catch(err => {
                    console.error(err);
                    this.loading = false;
                });
        },

        onSubmit() {
            // TODO - validate
            // TODO - propagate BE validation
            http()
                .put(
                    `${constants.urls.users}${this.sessionManager.user._id}`,
                     Object.assign({}, this.user, this.form)
                )
                .then(res => this.$router.push('/'))
                .catch(err => console.error('Oops: ', err));
        }
    },

    mounted() {
        window.componentHandler.upgradeAllRegistered();
    }
};
