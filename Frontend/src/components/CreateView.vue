<template>
    <h2>Create View</h2>
    <input type="text" v-model="viewName">
    <SelectTable :columns="columns" :table-name="tableName" @on-send-query="onReceiveQuery" />
    <code>
        {{ viewQuery }}
        <br>
    </code>
    <button @click="onCreateView">Create View</button>
</template>

<script lang="ts">
import { ref } from 'vue';
import SelectTable from './SelectTable.vue';
import { sendQuery } from '../services/database';
export default {
    name: 'CreateView'
}
</script>

<script lang="ts" setup>
interface Props {
    columns: any[];
    tableName: string;
}

const props = defineProps<Props>();
const emits = defineEmits(["onCreateView"]);
const viewName = ref<string>(`${props.tableName}View`);
const viewQuery = ref<string>('');
const onReceiveQuery = (query: string) => {
    viewQuery.value = `CREATE VIEW ${viewName.value} AS ${query}`;
}
const onCreateView = async () => {
    const res = await sendQuery(viewQuery.value);    
    if (res) {
        console.log(res);
        emits('onCreateView')
    }
}
</script>

<style scoped>
</style>