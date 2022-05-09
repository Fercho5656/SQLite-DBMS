<template>
  <Modal :show="showCreateTable" @close="onSwitchModal(false)">
    <CreateTable @createTable="onCreateTable" />
  </Modal>
  <UploadDatabase />
  <CreateDatabase @createDatabase="onCreateDatabase" />
  <Query @sendQuery="onSendQuery" />
  <SavedDatabases :savedDatabases="savedDatabases" @selectDatabase="onSelectDatabase"
    @deleteDatabase="onDeleteDatabase" />
  <Tables :tables="tables" :isDatabaseSelected="activeDatabase.length !== 0" @onSwitchModal="onSwitchModal" @onDeleteTable="onDeleteTable" />
</template>

<script lang="ts">
export default {
  name: "Manager",
};
</script>
<script setup lang='ts'>
import { ref } from "vue";
import {
  uploadFile,
  sendQuery,
  createDatabase,
  getDatabases,
  deleteDatabase,
  selectDatabase,
  Queries,
} from "../services/database";

import Tables from "../components/Tables.vue";
import SavedDatabases from "../components/SavedDatabases.vue";
import UploadDatabase from "../components/UploadDatabase.vue";
import CreateDatabase from "../components/CreateDatabase.vue";
import Query from "../components/Query.vue";
import Modal from "../components/Modal.vue";
import CreateTable from "../components/CreateTable.vue";

const showCreateTable = ref<boolean>(false);
const result = ref();
const savedDatabases = ref([] as any[]);
const activeDatabase = ref<string>("");
const tables = ref([] as any[]);

(async () => {
  savedDatabases.value = await getDatabases();
})();

const onSendQuery = async (queryResult: object) => {
  result.value = queryResult;
  console.log(result.value);
};

const onCreateDatabase = (newDatabase: string) => {
  savedDatabases.value.push(newDatabase);
};

const onDeleteDatabase = async (databaseName: string) => {
  await deleteDatabase(databaseName);
  savedDatabases.value = savedDatabases.value.filter(
    (database: string) => database !== databaseName
  );
};

const onSelectDatabase = async (database: string) => {
  await selectDatabase(database);
  tables.value = await sendQuery(Queries.getTables);
  activeDatabase.value = database;
  console.log(tables.value);
};

const onSwitchModal = (newVal: boolean) => (showCreateTable.value = newVal);

const onCreateTable = (newTable: string) => {
  console.log(newTable);
  showCreateTable.value = false;
  tables.value.push(newTable);
};

const onDeleteTable = async (tableName: string) => {
  const res = await sendQuery(`DROP TABLE ${tableName}`);
  if (res.status !== 500) {
    tables.value = tables.value.filter((table: any) => table.name !== tableName);
  }
}
</script>

<style>
</style>