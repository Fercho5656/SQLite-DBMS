<template>
  <Modal :show="showAlterTable" @close="onSwitchModal(false)">
    <AlterTable :columns="tableColumns" :tableName="selectedTable" />
  </Modal>
  <h2>Tables</h2>
  <button :disabled="!isDatabaseSelected" @click="$emit('onSwitchModal', true)">
    Create table
  </button>
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
        <tr v-for="table in tables" :key="table.name">
          <td>{{ table.name }}</td>
          <td>{{ table.sql }}</td>
          <td>
            <button @click="onEditTable(table.name)">🖊</button>
            <button @click="onDeleteTable(table.name)">🗑</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: "Tables",
};
</script>

<script setup lang="ts">
import { sendQuery, Queries } from '../services/database';
import Modal from './Modal.vue'
import AlterTable from './AlterTable.vue'

interface Props {
  tables: any[];
  isDatabaseSelected: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(["onSwitchModal", "onDeleteTable"]);

const tableColumns = ref([] as any[]);
const selectedTable = ref<string>('');
const showAlterTable = ref<boolean>(false);

const onSwitchModal = (newValue: boolean) => showAlterTable.value = newValue
const onDeleteTable = (tableName: string) => emit("onDeleteTable", tableName);
const onEditTable = async (tableName: string) => {
  const res = await sendQuery(Queries.describeTable.replace('%s', tableName));
  if (res.status !== 500) {
    tableColumns.value = res;
    selectedTable.value = tableName;
    showAlterTable.value = true
  }
}

</script>

<style scoped>
.wrapper {
  text-align: left;
  overflow-x: auto;
  white-space: nowrap;
}
</style>