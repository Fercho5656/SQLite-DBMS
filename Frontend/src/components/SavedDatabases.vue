<template>
  <h2>Saved Databases</h2>
  <ul>
    <li v-for="database in savedDatabases" :key="database">
      <a @click="$emit('selectDatabase', database)">{{ database }} &nbsp;</a>
      <button @click="$emit('deleteDatabase', database)">Delete</button>
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  name: "SaveDatabases",
};
</script>

<script setup lang="ts">
defineProps({
  savedDatabases: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["selectDatabase", "deleteDatabase"]);
</script>

<style scoped>
</style>