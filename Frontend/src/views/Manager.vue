<template>
  <Modal :show="showCreateTable" @close="onSwitchModal(false)">
    <CreateTable @createTable="onCreateTable" />
  </Modal>
  <UploadDatabase />
  <CreateDatabase @createDatabase="onCreateDatabase" />
  <Query @sendQuery="onSendQuery" />
  <SavedDatabases :savedDatabases="savedDatabases" @selectDatabase="onSelectDatabase" @deleteDatabase="onDeleteDatabase"
    @backupDatabase="onBackupDatabase" />
  <Tables :tables="tables" :isDatabaseSelected="activeDatabase.length !== 0" @onSwitchModal="onSwitchModal"
    @onDeleteTable="onDeleteTable" />
  <Views :views="views" @onDeleteView="onDeleteView" />
  <Triggers :triggers="triggers" @onDeleteTrigger="onDeleteTrigger" />
</template>

<script lang="ts">
export default {
  name: "Manager",
};
</script>
<script setup lang='ts'>
import { ref } from "vue";
import {
  uploadFile,
  sendQuery,
  createDatabase,
  getDatabases,
  deleteDatabase,
  selectDatabase,
  backupDatabase,
  Queries,
} from "../services/database";

import Tables from "../components/Tables.vue";
import Views from "../components/Views.vue";
import SavedDatabases from "../components/SavedDatabases.vue";
import UploadDatabase from "../components/UploadDatabase.vue";
import CreateDatabase from "../components/CreateDatabase.vue";
import Triggers from "../components/Triggers.vue";
import Query from "../components/Query.vue";
import Modal from "../components/Modal.vue";
import CreateTable from "../components/CreateTable.vue";

const showCreateTable = ref<boolean>(false);
const result = ref();
const savedDatabases = ref([] as any[]);
const activeDatabase = ref<string>("");
const tables = ref([] as any[]);
const views = ref([] as any[]);
const triggers = ref([] as any[]);

(async () => {
  savedDatabases.value = await getDatabases();
})();

const onSendQuery = async (queryResult: object) => {
  result.value = queryResult;
  console.log(result.value);
};

const onCreateDatabase = (newDatabase: string) => {
  savedDatabases.value.push(newDatabase);
};

const onDeleteDatabase = async (databaseName: string) => {
  await deleteDatabase(databaseName);
  savedDatabases.value = savedDatabases.value.filter(
    (database: string) => database !== databaseName
  );
  activeDatabase.value = ''
};

const onDeleteView = async (viewName: string) => {
  await sendQuery(`DROP VIEW ${viewName}`);
  views.value = views.value.filter((view: any) => view.name !== viewName);
}

const onSelectDatabase = async (database: string) => {
  await selectDatabase(database);
  tables.value = await sendQuery(Queries.getTables);
  views.value = await sendQuery(Queries.getViews);
  triggers.value = await sendQuery(Queries.getTriggers);
  activeDatabase.value = database;
  console.log(triggers.value);
};

const onBackupDatabase = async (database: string) => {
  const res = await backupDatabase(database);
  const { status }: any = res
  const { data }: any = res
  if (status === 200) {
    console.log("Backup Successful");
    savedDatabases.value.push(`${data.backupName}.db`);
  } else {
    console.log("Backup Failed");
  }
};

const onSwitchModal = (newVal: boolean) => (showCreateTable.value = newVal);

const onCreateTable = (newTable: string) => {
  console.log(newTable);
  showCreateTable.value = false;
  tables.value.push(newTable);
};

const onDeleteTable = async (tableName: string) => {
  const res = await sendQuery(`DROP TABLE ${tableName}`);
  if (res.status !== 500) {
    tables.value = tables.value.filter((table: any) => table.name !== tableName);
  }
}

const onDeleteTrigger = async (triggerName: string) => {
  const res = await sendQuery(`DROP TRIGGER IF EXISTS ${triggerName}`);
  if (res.status !== 500) {
    triggers.value = triggers.value.filter((trigger: any) => trigger.name !== triggerName);
  }
}
</script>

<style>
</style>