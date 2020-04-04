<template>
    <section class="container">
        <h2>{{ $t('register') }}</h2>

        <form @submit.prevent="register">
            <div class="form-field">
                <label for="name">{{ $t('name') }}</label>
                <input type="text" id="name" v-model="member.name" required maxlength="30">
            </div>

            <div class="form-field">
                <label for="email">{{ $t('email') }}</label>
                <input type="email" id="email" v-model="member.email" required>
            </div>

            <div class="form-field">
                <label for="password">{{ $t('password') }}</label>
                    <input type="password" id="password" v-model="member.password" required pattern=".{10,}" :title="$t('password-help')">
            </div>

            <div class="form-button">
                <button>{{ $t('register') }}</button>
            </div>
        </form>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Register',
    data() {
        return {
            member: {
                name: null,
                email: null,
                password: null,
            },
        };
    },
    methods: {
        async register() {
            try {
                await axios.post('/members', this.member);
                this.$router.push('/login');
            } catch (error) {
                console.log(error);
            }
        }
    },
};
</script>

<style lang="scss" scoped>
</style>
