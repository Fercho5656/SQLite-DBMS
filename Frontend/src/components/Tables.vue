<template>
    <h2>Tables</h2>
    <button :disabled="tables.length === 0" @click="$emit('onSwitchModal', true)">Create table</button>
    <ul>
        <li v-for="table in tables" :key="table">
            <p>{{ table.name }}</p>
        </li>
    </ul>
</template>

<script lang="ts">
export default {
    name: "Tables",
};
</script>

<script setup lang="ts">
interface Props {
    tables: any[];
}
const props = defineProps<Props>();
const emit = defineEmits(['onSwitchModal']);
</script>

<style scoped>
</style>