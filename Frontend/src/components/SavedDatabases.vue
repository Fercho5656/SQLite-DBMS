<template>
  <h2>Saved Databases</h2>
  <ul>
    <li v-for="database in savedDatabases" :key="database">
      <a @click="$emit('selectDatabase', database)">{{ database }} &nbsp;</a>
      <button @click="$emit('deleteDatabase', database)">Delete</button>
      <button @click="$emit('backupDatabase', database)">Backup</button>
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  name: "SaveDatabases",
};
</script>

<script setup lang="ts">
interface Props {
  savedDatabases: any[];
}
defineProps<Props>();

defineEmits(["selectDatabase", "deleteDatabase", "backupDatabase"]);
</script>

<style scoped>
</style>