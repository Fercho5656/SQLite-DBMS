<template>
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
      <a>{{ database }} &nbsp;</a>
      <button @click="onDeleteDatabase(database)">Delete</button>
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
} from "../services/database";

const selectedFile = ref();
const newDatabaseName = ref("");
const query = ref("");
const result = ref();
const savedDatabases = ref();

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
};
</script>

<style>
</style>