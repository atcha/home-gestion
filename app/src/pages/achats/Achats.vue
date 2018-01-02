<template>
  <div class="achats-container container">
    <h4>Gestion de vos achats</h4>
    <q-tabs>
      <q-tab default slot="title" name="add" label="Ajouts" icon="add" />
      <q-tab slot="title" name="stats" label="statistiques" icon="pie chart" />
      <q-tab slot="title" name="confs" label="configurations" icon="build" />

      <q-tab-pane name="add">Tab One</q-tab-pane>
      <q-tab-pane name="stats">Tab Three</q-tab-pane>
      <q-tab-pane name="confs">Tab Two</q-tab-pane>
    </q-tabs>
  </div>
</template>

<script>
  import {
    QTabs,
    QTab,
    QTabPane
  } from 'quasar-framework'
  export default {
    name: 'achats',
    components: {
      QTabs,
      QTab,
      QTabPane
    },
    data () {
      return {}
    }
  }
</script>

<style>
</style>
