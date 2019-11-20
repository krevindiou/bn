import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Forum from './views/Forum.vue';
import Members from './views/Members.vue';
import Profile from './views/Profile.vue';
import Chat from './views/Chat.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/forum',
        name: 'forum',
        component: Forum,
    },
    {
        path: '/members',
        name: 'members',
        component: Members,
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
    },
    {
        path: '/chat',
        name: 'chat',
        component: Chat,
    },
];

export default new VueRouter({
    mode: 'history',
    routes,
});
