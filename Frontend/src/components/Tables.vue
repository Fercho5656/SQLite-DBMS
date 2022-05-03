<template>
  <h2>Tables</h2>
  <button :disabled="tables.length === 0" @click="$emit('onSwitchModal', true)">
    Create table
  </button>
  <div class="wrapper">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Schema</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="table in tables" :key="table.name">
          <td>{{ table.name }}</td>
          <td>{{ table.sql }}</td>
          <td>
            <button>🖊</button>
            <button>❌</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
export default {
  name: "Tables",
};
</script>

<script setup lang="ts">
interface Props {
  tables: any[];
}
const props = defineProps<Props>();
const emit = defineEmits(["onSwitchModal"]);
</script>

<style scoped>
.wrapper {
  text-align: left;
  overflow-x: auto;
  white-space: nowrap;
}
</style>