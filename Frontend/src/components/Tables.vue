<template>
  <Modal :show="showAlterTable" @close="onSwitchModal(false)">
    <AlterTable :columns="tableColumns" :tableName="selectedTable" />
  </Modal>
  <Modal :show="showSelectTable" @close="onSwitchSelectModal(false)">
    <SelectTable :columns="tableColumns" :tableName="selectedTable" />
  </Modal>
  <Modal :show="showCreateView" @close="onSwitchViewModal(false)">
    <CreateView :columns="tableColumns" :tableName="selectedTable" />
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
            <button title="Create View" @click="onCreateView(table.name)">👁</button>
            <button title="Select table" @click="onSelectTable(table.name)">☝</button>
            <button title="Alter table" @click="onEditTable(table.name)">🖊</button>
            <button title="Delete table" @click="onDeleteTable(table.name)">🗑</button>
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
import SelectTable from './SelectTable.vue'
import CreateView from './CreateView.vue'

interface Props {
  tables: any[];
  isDatabaseSelected: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(["onSwitchModal", "onDeleteTable"]);

const tableColumns = ref([] as any[]);
const selectedTable = ref<string>('');
const showAlterTable = ref<boolean>(false);
const showSelectTable = ref<boolean>(false);
const showCreateView = ref<boolean>(false);

const onSwitchModal = (newValue: boolean) => showAlterTable.value = newValue
const onSwitchSelectModal = (newValue: boolean) => showSelectTable.value = newValue
const onSwitchViewModal = (newValue: boolean) => showCreateView.value = newValue
const onDeleteTable = (tableName: string) => emit("onDeleteTable", tableName);
const onSelectTable = async (tableName: string) => {
  const res = await sendQuery(Queries.describeTable.replace('%s', tableName));
  if (res) {
    selectedTable.value = tableName
    tableColumns.value = res.map((col: any) => col.name);
    onSwitchSelectModal(true)
  }

}
const onEditTable = async (tableName: string) => {
  const res = await sendQuery(Queries.describeTable.replace('%s', tableName));
  if (res.status !== 500) {
    tableColumns.value = res;
    selectedTable.value = tableName;
    showAlterTable.value = true
  }
}

const onCreateView = async (tableName: string) => {
  const res = await sendQuery(Queries.describeTable.replace('%s', tableName));
  if (res.status !== 500) {
    tableColumns.value = res.map((col: any) => col.name);
    selectedTable.value = tableName;
    showCreateView.value = true
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