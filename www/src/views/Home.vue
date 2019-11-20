<template>
    <main>
        <div class="container">
            <section class="topic">
                <h1>{{ $t('last-forum-messages') }}</h1>
                <Topics :nb="3" />
            </section>
            <section
                v-if="announcements.length > 0"
                class="announcement">
                <h1><i class="fas fa-bullhorn"/> {{ $t('announcements-of-the-day') }}</h1>
                <vue-simple-spinner class="spinner-announcements"/>
                <ul>
                    <li
                        v-for="announcement in announcements"
                        :key="announcement.announcementId">
                        <p>{{ announcement.title }}</p>
                        <span class="author">{{ announcement.member.name }}</span>
                    </li>
                </ul>
            </section>
            <section class="chat">
                <h1><i class="fas fa-comments"/> {{ $t('chat') }}</h1>
                <vue-simple-spinner class="spinner-chats"/>
                <ul>
                    <li
                        v-for="chatMessage in chatMessages"
                        :key="chatMessage.messageId">
                        <span class="author">
                            <v-popover>
                                <div>{{ chatMessage.member.name }}</div>
                                <Member
                                    slot="popover"
                                    :member="chatMessage.member" />
                            </v-popover>
                        </span>
                        <span class="date-time">{{ chatMessage.createdAt | moment("from") }}</span>
                        <p>{{ chatMessage.content }}</p>
                    </li>
                </ul>
            </section>
        </div>
    </main>
</template>

<script>
import axios from 'axios';
import Topics from '@/components/Topics.vue';
import Member from '@/components/Member.vue';

export default {
    name: 'Home',
    components: {
        Topics,
        Member,
    },
    data() {
        return {
            announcements: [],
            chatMessages: [],
        };
    },
    created() {
        this.getAnnouncements().then((announcements) => {
            this.announcements = announcements;
            if (document.getElementsByClassName('spinner-announcements').length > 0) {
                document.getElementsByClassName('spinner-announcements')[0].style.display = 'none';
            }
        });
        this.getChatMessages().then((chatMessages) => {
            this.chatMessages = chatMessages;
            if (document.getElementsByClassName('spinner-chats').length > 0) {
                document.getElementsByClassName('spinner-chats')[0].style.display = 'none';
            }
        });
    },
    methods: {
        async getAnnouncements() {
            try {
                const response = await axios.get('/announcements', {
                    params: {
                        createdAt: new Date().toISOString().substr(0, 10),
                    },
                });
                return response.data;
            } catch (error) {
                console.log(error.response);
            }
        },
        async getChatMessages() {
            try {
                const response = await axios.get('/chat-messages', {
                    params: {
                        limit: 5,
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
section.topic {
    grid-row: span 2;
    grid-column: 1;
}

section.announcement,
section.chat {
    margin-left: 30px;
    padding: 0 15px;
    background-color: #fff;
}

section.announcement {
    grid-row: 1;
    grid-column: 2;
    margin-bottom: 30px;

    ul {
        list-style: none;
    }

    li {
        margin-bottom: 5px;
    }

    p {
        margin: 0;
    }

    .author {
        color: #999;
    }
}

section.chat {
    grid-row: 2;
    grid-column: 2;

    ul {
        list-style: none;
    }

    .author {
        display: inline-block;
        font-weight: bold;
        color: #999;
    }

    .date-time {
        margin-left: 5px;
        color: #999;
        font-size: 14px;
    }

    p {
        margin: 0 0 10px 0;
    }
}
</style>
