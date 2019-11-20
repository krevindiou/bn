<template>
    <table
        v-if="topics.length"
        class="post">
        <tr>
            <th class="author">{{ $t('author') }}</th>
            <th class="title">{{ $t('title') }}</th>
            <th class="nbPosts">{{ $t('nb-posts') }}</th>
            <th class="activity">{{ $t('activity') }}</th>
        </tr>
        <tr
            v-for="topic in topics"
            :key="topic.topicId">
            <td class="author">
                <v-popover>
                    <div>{{ topic.member.name }}</div>
                    <Member
                        slot="popover"
                        :member="topic.member" />
                </v-popover>
            </td>
            <td class="title">{{ topic.title }}</td>
            <td class="nbPosts">{{ topic.nbPosts }}</td>
            <td class="activity">{{ topic.lastPost.member.name }} {{ topic.lastPost.createdAt | moment("from") }}</td>
        </tr>
    </table>
    <vue-simple-spinner
        v-else
        class="spinner-topics"/>
</template>

<script>
import axios from 'axios';
import Member from '@/components/Member.vue';

export default {
    name: 'Topics',
    components: {
        Member,
    },
    props: {
        nb: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            topics: [],
        };
    },
    created() {
        this.getTopics().then((topics) => {
            this.topics = topics;
            if (document.getElementsByClassName('spinner-topics').length > 0) {
                document.getElementsByClassName('spinner-topics')[0].style.display = 'none';
            }
        });
    },
    methods: {
        async getTopics() {
            try {
                const response = await axios.get('/v1/topics', {
                    params: {
                        limit: this.nb,
                    },
                });
                return response.data;
            } catch (error) {
                console.log(error.response);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.post {
    width: 100%;

    th {
        color: #999;
        font-size: 14px;
    }

    th,
    td {
        padding: 20px;
        border-bottom: 1px solid #ddd;
        text-align: left;
    }

    .nbPosts {
        text-align: center;
    }

    .activity {
        text-align: right;
    }
}
</style>
