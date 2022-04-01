<template>
  <div class="create-database">
    <input type="text" name="newDatabase" v-model="newDatabaseName" required />
    <button @click="onCreateDatabase" :disabled="!newDatabaseName">
      Create
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: "CreateDatabase",
};
</script>

<script setup lang="ts">
import { ref } from "vue";
import { createDatabase } from "../services/database";

const newDatabaseName = ref<string>("");

const emit = defineEmits(["createDatabase"]);

const onCreateDatabase = async () => {
  await createDatabase(newDatabaseName.value);
  // push created database to saved databases
  emit("createDatabase", `${newDatabaseName.value}.db`);
};
</script>

<style scoped>
</style>