<template>
    <h2>Alter {{tableName}}</h2>
    <button>Add Column</button>
    <table>
        <thead>
            <tr>
                <th>Column</th>
                <th>Type</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="column in columns" :key="column.name">
                <td>{{ column.name }}</td>
                <td>{{ column.type }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">import { ref } from 'vue';

export default {
    name: 'AlterTable'
}
</script>

<script lang="ts" setup>
interface Props {
    columns: any[];
    tableName: string;
}
const props = defineProps<Props>();
</script>

<style scoped>
</style>