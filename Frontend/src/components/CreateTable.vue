<template>
    <div class="container">
        <h2>Create Table</h2>
        <div class="form-control">
            <label for="tableName">Table Name</label>
            <input type="text" id="tableName" />
        </div>
        <div class="controls">
            <button @click="onCreateCol">➕</button>
            <button @click="onDeleteCol">➖</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Column Name</th>
                    <th>Data Type</th>
                    <th>Not Null</th>
                    <th>Primary Key</th>
                    <th>Auto Increment</th>
                    <th>Unique</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="col in columns" :key="col">
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
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const columns = ref([] as any[])

const onCreateCol = () => {
    columns.value.push({
        name: '',
        type: 'INTEGER',
        notNull: false,
        primaryKey: false,
        autoIncrement: false,
        unique: false,
    })
}

const onDeleteCol = () => {
    
}

</script>

<style scoped>
table,
td,
th {
    border: 1px solid;
}
</style>