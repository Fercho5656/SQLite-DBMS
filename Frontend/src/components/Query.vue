<template>
  <div class="query">
    <input type="text" v-model="query" placeholder="SQLite Query" />
    <button @click="onSendQuery" :disabled="!query">Send Query</button>
  </div>
</template>

<script lang="ts">
export default {
  name: "Query",
};
</script>

<script setup lang="ts">
import { sendQuery } from "../services/database";
import { ref } from "vue";

const query = ref<string>("");
const emit = defineEmits(["sendQuery"]);
const onSendQuery = async () => {
  emit("sendQuery", await sendQuery(query.value));
};
</script>

<style scoped>
</style>