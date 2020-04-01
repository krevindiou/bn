<template>
    <body>
        <nav>
            <ul class="container">
                <li><router-link to="/"><i class="fas fa-home"/> {{ $t('website-title') }}</router-link></li>
                <li><router-link to="/forum"><i class="fas fa-comment"/> {{ $t('forum') }}</router-link></li>
                <li><router-link to="/members"><i class="fas fa-users"/> {{ $t('members') }}</router-link></li>
                <li v-if="this.$session.has('member')"><router-link to="/profile"><i class="fas fa-user-circle"/> {{ $t('profile') }}</router-link></li>
                <li v-if="!this.$session.has('member')"><router-link to="/login"><i class="fas fa-sign-in-alt"/> {{ $t('login') }}</router-link></li>
                <li v-if="this.$session.has('member')"><a
                    href="#"
                    @click="logout()"><i class="fas fa-sign-out-alt"/> {{ $t('logout') }}</a></li>
            </ul>
        </nav>
        <header>
            <div class="container">
                <p class="title">{{ $t('website-title') }}</p>
                <p v-html="$t('website-baseline')"></p>
                <router-link
                    v-if="!this.$session.has('member')"
                    class="button register"
                    to="/register">{{ $t('register') }}</router-link>
            </div>
        </header>
        <router-view/>
        <footer>
            <div class="container">
                &copy; {{ $t('website-copyright') }}
            </div>
        </footer>
    </body>
</template>

<script>
import axios from 'axios';

export default {
    name: 'App',
    methods: {
        async logout() {
            try {
                $cookies.remove('accessToken');
                this.$session.destroy();
                this.$router.push('/login');
            } catch (error) {
                console.log(error.response);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
