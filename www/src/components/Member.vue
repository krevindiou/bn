<template>
    <dl>
        <dt class="name">{{ member.name }}</dt>
        <dd :class="'role ' + member.role"><span>{{ member.role }}</span></dd>
        <dd
            v-if="member.picture"
            class="picture"><img
                :src="member.picture"
                :alt="member.name" ></dd>
        <dd
            v-if="member.website"
            class="website"><a
                :href="member.website"
                target="_blank">{{ $t('website') }}</a>&nbsp;<i class="fas fa-external-link-alt"/></dd>
        <dd
            v-if="member.quote"
            class="quote">{{ member.quote }}</dd>
        <dd class="createdAt">{{ member.createdAt | moment("LL") }}</dd>
    </dl>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Member',
    props: {
        member: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
dl {
    position: relative;
    background: #fff;
    border: 10px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 0 0 1px #ccc;
    padding: 5px;
    width: 340px;
    min-height: 450px;
}

dd {
    padding: 0 20px;
    margin: 0 0 10px 0;
}

.role.user {
    display: none;
}

.role:not([class*='user']) {
    position: absolute;
    width: 150px;
    height: 150px;
    overflow: hidden;
    top: -15px;
    right: -15px;

    &::before,
    &::after {
        position: absolute;
        z-index: -1;
        content: '';
    }

    &::before {
        top: 0;
        left: 0;
    }

    &::after {
        bottom: 0;
        right: 0;
    }

    span {
        position: absolute;
        left: -25px;
        top: 30px;
        display: block;
        width: 225px;
        padding: 15px 0;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
        color: #fff;
        font-size: 18px;
        line-height: 1;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
        text-align: center;
        transform: rotate(45deg);
        text-transform: capitalize;
    }

    &.admin {
        span {
            background-color: #ee4433;
        }

        &::before,
        &::after {
            border: 5px solid #c5382b;
        }
    }

    &.moderator {
        span {
            background-color: #ee8822;
        }

        &::before,
        &::after {
            border: 5px solid #bd6c1b;
        }
    }
}

.name {
    font-weight: bold;
    font-size: 24px;
    padding: 10px;
}

.picture {
    text-align: center;
}

.website {
    position: absolute;
    bottom: 0;
    left: 0;

    color: #333;

    a {
        color: #333;
    }
}

.quote {
    white-space: pre-wrap;
    font-style: italic;
    height: 130px;
    overflow: hidden;
    position: absolute;
    top: 260px;
}

.createdAt {
    position: absolute;
    bottom: 0;
    right: 0;
}
</style>
