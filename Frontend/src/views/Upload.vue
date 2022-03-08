<template>
  <div class="file-upload">
    <input type="file" @change="onFileChange" name="database" />
    <button @click="onUploadFile" :disabled="!selectedFile">Upload</button>
  </div>
  <div class="query">
    <input type="text" v-model="query" placeholder="SQLite Query" />
    <button @click="onSendQuery" :disabled="!query">Send Query</button>
  </div>
</template>

<script lang="ts">
export default {
  name: "Upload",
};
</script>
<script setup lang='ts'>
import { ref } from "vue";
import { uploadFile, sendQuery } from "../services/database";

const selectedFile = ref();
const query = ref('');
const result = ref();

const onFileChange = (e: any) => {
  selectedFile.value = e.target.files[0];
  console.log(typeof selectedFile.value);
};

const onUploadFile = async () => {
  await uploadFile(selectedFile.value);
};

const onSendQuery = async () => {
  result.value = sendQuery(query.value);
  console.log(result.value)
}
</script>

<style>
</style>