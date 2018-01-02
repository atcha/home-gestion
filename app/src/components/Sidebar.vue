<template>
  <!-- Left Side Panel -->
  <q-list no-border link>
    <q-list-header>Essential Links</q-list-header>
    <q-side-link item to="/">
      <q-item-side icon="home" />
      <q-item-main label="Accueil" />
    </q-side-link>
    <q-side-link item to="/achats">
      <q-item-side icon="shopping basket" />
      <q-item-main label="Gestion des achats" />
    </q-side-link>
  </q-list>
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
