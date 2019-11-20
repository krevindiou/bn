<template>
    <main>
        <div class="container">
            <Topics :nb="10" />
        </div>
    </main>
</template>

<script>
import Topics from '@/components/Topics.vue';

export default {
    name: 'Forum',
    components: {
        Topics,
    },
};
</script>

<style lang="scss" scoped>
</style>
