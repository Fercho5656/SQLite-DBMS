<template>
  <h2>Saved Databases</h2>
  <ul>
    <li v-for="(database, index) in savedDatabases" :key="database">
      <a
        :class="(selectedDatabase === index) && 'active'"
        @click="onSelectDatabase(index, database)"
        >{{ database }}&nbsp;</a
      >
      <button @click="$emit('deleteDatabase', database)">Delete</button>
      <button @click="$emit('backupDatabase', database)">Backup</button>
    </li>
  </ul>
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  name: "SaveDatabases",
};
</script>

<script setup lang="ts">
interface Props {
  savedDatabases: any[];
}
defineProps<Props>();
const emits = defineEmits([
  "selectDatabase",
  "deleteDatabase",
  "backupDatabase",
]);

const selectedDatabase = ref<number>();
const onSelectDatabase = (index: number, database: string) => {
  selectedDatabase.value = index;
  emits("selectDatabase", database);
};
</script>

<style scoped>
.active {
  font-weight: bold;
}
</style>