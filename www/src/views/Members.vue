<template>
    <main>
        <vue-simple-spinner class="spinner-members"/>
        <div class="container">
            {{ $t('members') }}
            <ul>
                <li
                    v-for="member in members"
                    :key="member.memberId">
                    <Member :member="member" />
                </li>
            </ul>
        </div>
    </main>
</template>

<script>
import axios from 'axios';
import Member from '@/components/Member.vue';

export default {
    name: 'Members',
    components: {
        Member,
    },
    data() {
        return {
            members: [],
        };
    },
    created() {
        this.getMembers().then((members) => {
            this.members = members;
            if (document.getElementsByClassName('spinner-members').length > 0) {
                document.getElementsByClassName('spinner-members')[0].style.display = 'none';
            }
        });
    },
    methods: {
        async getMembers() {
            try {
                const response = await axios.get('/v1/members');
                return response.data;
            } catch (error) {
                console.log(error.response);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

li {
    list-style-type: none;
    margin-bottom: 30px;
}
</style>
