<template>
    <h2>Triggers</h2>
    <div class="wrapper">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Schema</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="trigger in triggers">
                    <td>{{ trigger.name }}</td>
                    <td>{{ trigger.sql }}</td>
                    <td @click="$emit('onDeleteTrigger', trigger.name)"><button>🗑</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
    name: 'Triggers'
}
</script>

<script lang="ts" setup>
interface Props {
    triggers: any[];
}

const props = defineProps<Props>();
const emits = defineEmits(["onDeleteTrigger"]);

</script>

<style scoped>
.wrapper {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    text-align: left;
    overflow-x: auto;
    white-space: nowrap;
}

td {
    width: 25px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>