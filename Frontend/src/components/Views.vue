<template>
    <h2>Views</h2>
    <Modal :show="showViewModal" @close="onCloseView(false)">
        <h3>Select View</h3>
        <p>{{ viewResult }}</p>
    </Modal>
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
                <tr v-for="view in views">
                    <td>{{ view.name }}</td>
                    <td>{{ view.sql }}</td>
                    <td>
                        <button title="Select View" @click="onSelectView(view.name)">☝</button>
                        <button title="Delete View" @click="onDeleteView(view.name)">🗑</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import Modal from './Modal.vue';
import { sendQuery } from '../services/database';
export default {
    name: "Views",
}
</script>

<script lang="ts" setup>
interface Props {
    views: any[];
}

const props = defineProps<Props>();
const emits = defineEmits(['onDeleteView']);
const showViewModal = ref<boolean>(false);
const viewResult = ref<any>(null);

const onCloseView = (newValue: boolean) => showViewModal.value = newValue;
const onDeleteView = async (viewName: string) => {
    emits('onDeleteView', viewName);
}
const onSelectView = async (viewName: string) => {
    showViewModal.value = true
    const res = await sendQuery(`SELECT * FROM ${viewName}`);
    if (res) {
        viewResult.value = res;
    }
}
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
</style>