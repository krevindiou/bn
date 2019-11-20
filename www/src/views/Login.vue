<template>
    <main>
        <div class="container">
            {{ $t('login') }}
            <form
                class="login"
                @submit.prevent="login">
                <div>
                    <label for="email">{{ $t('email') }}</label>
                    <input
                        id="email"
                        v-model="email"
                        type="email"
                        name="email"
                        value="" >
                </div>
                <div>
                    <label for="password">{{ $t('password') }}</label>
                    <input
                        id="password"
                        v-model="password"
                        type="password"
                        name="password"
                        value="" >
                </div>
                <div>
                    <input
                        type="submit"
                        :value="$t('login')" >
                </div>
            </form>
        </div>
    </main>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('/login', {
                    email: this.email,
                    password: this.password,
                });

                this.$session.set('member', response.data);
                this.$router.push('/');
            } catch (error) {
                console.log(error.response);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
form.login {
    & > div {
        margin: 10px 0;
    }

    label {
        display: inline-block;
        width: 200px;
    }

    input {
        border: 1px solid #aaa;
        background-color: #fff;

        &[type='submit'] {
            margin-left: 200px;
            cursor: pointer;
        }
    }
}
</style>
