<template>
    <div class="queryCreation">
        <span>SELECT &nbsp;</span>
        <select v-model="col1">
            <option value="*">*</option>
            <option v-for="col in columns" :value="col">{{ col }}</option>
        </select>
        <span>&nbsp;FROM {{ tableName }}</span>
        <span>&nbsp;WHERE&nbsp;</span>
        <select v-model="col2">
            <option v-for="col in columns" :value="col">{{ col }}</option>
        </select>
        <select v-model="sqlOperator">
            <option value="="> =</option>
            <option value="<">&lt;</option>
            <option value="<=">&lt;=</option>
            <option value=">"> ></option>
            <option value="=>"> =></option>
            <option value="<>">&lt;></option>
        </select>
        <input type="text" placeholder="value" v-model="conditionValue" />
        <button @click="onSendQuery">Send Select</button>
    </div>
    <code>
        {{ sqlQuery }}
    </code>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { sendQuery, Queries } from '../services/database';
export default {
    name: 'SelectTable'
}
</script>
<script setup lang="ts">
interface Props {
    columns: any[];
    tableName: string;
}

const props = defineProps<Props>();
const col1 = ref<string>('');
const col2 = ref<string>('');
const sqlOperator = ref<string>('');
const conditionValue = ref<string>('');
const sqlQuery = ref<string>('');

const onSendQuery = async () => {
    const res = await sendQuery(sqlQuery.value);
    if (res) {
        console.log(res);
    }
}

watch([col1, col2, sqlOperator, conditionValue], () => {
    sqlQuery.value = `SELECT ${col1.value} FROM ${props.tableName} ${col2.value ? "WHERE" : ""} 
    ${col2.value ? col2.value : ""} ${col2.value ? sqlOperator.value : ""} ${col2.value ? conditionValue.value : ""}`
});
</script>

<style scoped>
</style>