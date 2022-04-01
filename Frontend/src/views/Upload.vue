<template>
  <Modal :show="showCreateTable" @close="onSwitchModal(false)">
    <CreateTable @createTable="onCreateTable" />
  </Modal>
  <div class="file-upload">
    <input type="file" @change="onFileChange" name="database" />
    <button @click="onUploadFile" :disabled="!selectedFile">Upload</button>
  </div>
  <div class="create-database">
    <input type="text" name="newDatabase" v-model="newDatabaseName" required />
    <button @click="onCreateDatabase" :disabled="!newDatabaseName">
      Create
    </button>
  </div>
  <div class="query">
    <input type="text" v-model="query" placeholder="SQLite Query" />
    <button @click="onSendQuery" :disabled="!query">Send Query</button>
  </div>
  <h2>Saved Databases</h2>
  <ul>
    <li v-for="database in savedDatabases" :key="database">
      <a @click="onSelectDatabase(database)">{{ database }} &nbsp;</a>
      <button @click="onDeleteDatabase(database)">Delete</button>
    </li>
  </ul>
  <h2>Tables</h2>
  <button :disabled="tables.length === 0" @click="onSwitchModal(true)">
    Create table
  </button>
  <ul>
    <li v-for="table in tables" :key="table">
      <p>{{ table.name }}</p>
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  name: "Upload",
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

import Modal from "../components/Modal.vue";
import CreateTable from "../components/CreateTable.vue";

const showCreateTable = ref<boolean>(false);
const selectedFile = ref();
const newDatabaseName = ref("");
const query = ref("");
const result = ref();
const savedDatabases = ref();
const tables = ref([] as any[]);

(async () => {
  savedDatabases.value = await getDatabases();
})();

const onFileChange = (e: any) => {
  selectedFile.value = e.target.files[0];
  console.log(typeof selectedFile.value);
};

const onUploadFile = async () => {
  await uploadFile(selectedFile.value);
};

const onSendQuery = async () => {
  result.value = sendQuery(query.value);
  console.log(result.value);
};

const onCreateDatabase = async () => {
  await createDatabase(newDatabaseName.value);
  savedDatabases.value.push(`${newDatabaseName.value}.db`);
};

const onDeleteDatabase = async (databaseName: String) => {
  await deleteDatabase(databaseName);
  savedDatabases.value = savedDatabases.value.filter(
    (database: String) => database !== databaseName
  );
};

const onSelectDatabase = async (database: String) => {
  await selectDatabase(database);
  tables.value = await sendQuery(Queries.getTables);
};

const onSwitchModal = (newVal: boolean) => (showCreateTable.value = newVal);

const onCreateTable = (newTable:string) => {
  console.log(newTable);
  showCreateTable.value = false;
  tables.value.push(newTable)
};
</script>

<style>
</style>