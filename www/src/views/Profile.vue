<template>
    <section class="container">
        <h2>{{ $t('profile') }}</h2>

        <form @submit.prevent="save">
            <div class="form-field">
                <label for="name">{{ $t('name') }}</label>
                <input type="text" id="name" v-model="member.name" required maxlength="30">
            </div>

            <div class="form-field">
                <label for="email">{{ $t('email') }}</label>
                <input type="email" id="email" v-model="member.email" required>
            </div>

            <div class="form-field">
                <label for="picture">{{ $t('picture') }}</label>
                <input type="text" id="picture" v-model="member.picture" maxlength="100">
            </div>

            <div class="form-field">
                <label for="website">{{ $t('website') }}</label>
                <input type="url" id="website" v-model="member.website" maxlength="50">
            </div>

            <div class="form-field">
                <label for="quote">{{ $t('quote') }}</label>
                <input type="url" id="quote" v-model="member.quote" maxlength="150">
            </div>

            <div class="form-button">
                <button>{{ $t('save') }}</button>
            </div>
        </form>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Profile',
    data() {
        return {
            member: null,
        };
    },
    created() {
        this.load();
    },
    methods: {
        async load() {
            try {
                const response = await axios.get('/members/me');
                this.member = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async save() {
            try {
                await axios.put('/members/me', this.member);
            } catch (error) {
                console.log(error);
            }
        }
    },
};
</script>

<style lang="scss" scoped>
</style>
