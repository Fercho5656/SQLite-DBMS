<template>
  <div class="container">
    <h2>Create Table</h2>
    <div class="form-control">
      <label for="tableName">Table Name</label>
      <input type="text" id="tableName" v-model="tableName" />
    </div>
    <div class="controls">
      <button @click="onCreateCol">➕</button>
      <button @click="onDeleteCol" :disabled="selectedRow === undefined">
        ➖
      </button>
    </div>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Column Name</th>
          <th>Data Type</th>
          <th>Not Null</th>
          <th>Primary Key</th>
          <th>Auto Increment</th>
          <th>Unique</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(col, idx) in columns"
          :key="col"
          :class="{ active: idx === selectedRow }"
          @click="onSelect(idx)"
        >
          <td>{{ idx }}</td>
          <td>
            <input type="text" v-model="col.name" placeholder="Row" />
          </td>
          <td>
            <select v-model="col.type">
              <option value="INTEGER">INTEGER</option>
              <option value="TEXT">TEXT</option>
              <option value="BLOB">BLOB</option>
              <option value="REAL">REAL</option>
              <option value="NUMERIC">NUMERIC</option>
            </select>
          </td>
          <td>
            <input type="checkbox" v-model="col.notNull" />
          </td>
          <td>
            <input type="checkbox" v-model="col.primaryKey" />
          </td>
          <td>
            <input type="checkbox" v-model="col.autoIncrement" />
          </td>
          <td>
            <input type="checkbox" v-model="col.unique" />
          </td>
        </tr>
      </tbody>
    </table>
    <h3>SQLite Query</h3>
    <code>
      {{ sqlQuery }}
    </code>
    <br />
    <button :disabled="columns.length === 0" @click="onCreateTable">Create Table</button>
  </div>
</template>
<script lang="ts">
export default {
  name: "CreateTable",
};
</script>

<script setup lang="ts">
import { ref, watch } from "vue";
import {sendQuery} from "../services/database";

const emit = defineEmits(["createTable"]);

const tableName = ref<string>("NewTable");
const sqlQuery = ref<string>("CREATE TABLE");
const selectedRow = ref<number>();
const columns = ref([] as any[]);

const onCreateCol = () => {
  columns.value.push({
    name: "NewRow",
    type: "INTEGER",
    notNull: false,
    primaryKey: false,
    autoIncrement: false,
    unique: false,
  });
};

const onSelect = (idx: number) => (selectedRow.value = idx);

const onDeleteCol = () => {
  if (selectedRow.value === undefined) return;
  columns.value.splice(selectedRow.value, 1);
};

const onCreateTable = async () => {
  await sendQuery(sqlQuery.value);
  emit("createTable", tableName.value);
}

const createQuery = () => {
  const cols = columns.value.map((col, idx) => {
    const { name, type, notNull, primaryKey, autoIncrement, unique } = col;
    return `
    ${idx === 0 ? "" : ","} ${name} ${type} ${notNull ? "NOT NULL" : ""} ${
      primaryKey ? "PRIMARY KEY" : ""
    } ${autoIncrement ? "AUTOINCREMENT" : ""} ${unique ? "UNIQUE" : ""}`;
  });
  sqlQuery.value = `CREATE TABLE ${tableName.value} (${cols.join(" ")}\n)`;
};

watch([columns.value, tableName], createQuery);
</script>

<style scoped>
table,
td,
th {
  border: 1px solid;
}

tbody tr {
  cursor: pointer;
}

tr.active {
  background-color: #ccc;
}

code {
  font-size: 15px;
  max-width: 75ch;
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>