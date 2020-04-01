import Vue from 'vue';
import VueSession from 'vue-session';
import VueSpinner from 'vue-simple-spinner';
import VTooltip from 'v-tooltip';
import VueMoment from 'vue-moment';
import VueCookies from 'vue-cookies'
import moment from 'moment';
import axios from 'axios';
import App from './views/App.vue';
import router from './router';
import './assets/style.scss';
import 'moment/locale/fr';
import env from '@/env';
import i18n from './i18n'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

Vue.config.productionTip = env === 'dev';

Vue.use(VueSession, {
    persist: true,
});

Vue.use(VTooltip, {
    popover: {
        defaultTrigger: 'hover',
    },
});

Vue.use(VueMoment, {
    moment,
});

Vue.use(VueCookies);

const accessToken = Vue.$cookies.get('accessToken');
if (accessToken) {
    axios.defaults.headers.common = { Authorization: `Bearer ${accessToken}` };
}

Vue.component('vue-simple-spinner', VueSpinner);

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
