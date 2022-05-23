<template>
    <h2>Create Trigger</h2>
    <div class="trigger-creation">
        <span>CREATE TRIGGER&nbsp;</span>
        <input type="text" v-model="triggerName" placeholder="Trigger name">
        <select v-model="when">
            <option disabled selected>When</option>
            <option value="BEFORE">BEFORE</option>
            <option value="AFTER">AFTER</option>
            <option value="INSTEAD OF">INSTEAD OF</option>
        </select>
        <select v-model="event">
            <option disabled selected>Event</option>
            <option value="INSERT">INSERT</option>
            <option value="UPDATE">UPDATE</option>
            <option value="DELETE">DELETE</option>
        </select>
        <span>&nbsp;ON {{ tableName }}</span>
        <p>BEGIN</p>
        <textarea v-model="triggerStructure" cols="30" rows="10"></textarea>
        <p>END</p>
        <button @click="onCreateTrigger" :disabled="triggerSql.length === 0">Create Trigger</button><br>
        <code>{{ triggerSql }}</code>
    </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { sendQuery } from '../services/database';
export default {
    name: 'CreateTrigger'
}
</script>

<script lang="ts" setup>
interface Props {
    tableName: string;
}

const props = defineProps<Props>();
const emits = defineEmits(["onCreateTrigger"]);
const triggerName = ref<string>(`${props.tableName}_trigger`);
const when = ref<string>('');
const event = ref<string>('');
const triggerStructure = ref<string>('');
const triggerSql = ref<string>('');

const onCreateTrigger = async () => {
    const res = await sendQuery(triggerSql.value)
    if (res) {
        emits('onCreateTrigger', triggerName)
    }
}

watch([triggerName, when, event, triggerStructure], () => {
    triggerSql.value = `CREATE TRIGGER ${triggerName.value} ${when.value} ${event.value} ON ${props.tableName}
    BEGIN
        ${triggerStructure.value}
    END`;
})
</script>

<style scoped>
</style>