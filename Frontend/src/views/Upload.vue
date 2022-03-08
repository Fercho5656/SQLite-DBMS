<template>
  <div class="file-upload">
    <input type="file" @change="onFileChange" name="database" />
    <button @click="onUploadFile" :disabled="!selectedFile">Upload</button>
  </div>
</template>

<script lang="ts">
export default {
  name: "Upload",
};
</script>
<script setup lang='ts'>
import { ref } from "vue";
import { uploadFile } from "../services/database";
const selectedFile = ref();

const onFileChange = (e: any) => {
  selectedFile.value = e.target.files[0];
  console.log(typeof selectedFile.value);
};

const onUploadFile = async () => {
  uploadFile(selectedFile.value);
};
</script>

<style>
</style>