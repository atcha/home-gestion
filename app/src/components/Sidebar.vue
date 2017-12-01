<template>
  <!-- Left Side Panel -->
  <div>
    <q-list no-border link inset-separator>
      <q-list-header>Essential Links</q-list-header>
      <q-side-link item to="/">
        <q-item-side icon="home" />
        <q-item-main label="Accueil" />
      </q-side-link>
      <q-side-link item to="/achats-configuration">
        <q-item-side icon="school" />
        <q-item-main label="Configuration" />
      </q-side-link>
    </q-list>
  </div>
</template>

<script>
  import {
    QList,
    QListHeader,
    QSideLink,
    QItemMain,
    QItemSide
  } from 'quasar-framework'

export default {
    name: 'SideBar',
    components: {
      QList,
      QListHeader,
      QSideLink,
      QItemMain,
      QItemSide
    },
    data () {
      return {}
    }
}
</script>

<style>
</style>
