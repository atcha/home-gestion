<template>
  <!-- Left Side Panel -->
  <q-list no-border link inset-delimiter>
    <q-list-header>Menu</q-list-header>
    <q-side-link exact item to="/home">
      <q-item-side icon="home" />
      <q-item-main label="Accueil" />
    </q-side-link>
    <q-collapsible :opened="boughtOpened" icon="shopping basket" menu label="Gestion des achats">
      <div class="scroll" style="max-height: 400px">
        <q-side-link item to="/achats/add">
          <q-item-side icon="add" />
          <q-item-main label="Achats" sublabel="Ajout, modification, liste des achats"/>
        </q-side-link>
        <q-side-link item to="/achats/stats">
          <q-item-side icon="pie chart" />
          <q-item-main label="Statistiques" sublabel="Statistiques de vos achats"/>
        </q-side-link>
        <q-side-link item to="/achats/config">
          <q-item-side icon="build" />
          <q-item-main label="Configuration" sublabel="Ajout, modification, liste des magasins et rayons" />
        </q-side-link>
      </div>
    </q-collapsible>
  </q-list>
</template>

<script>
  import {
    QList,
    QListHeader,
    QSideLink,
    QItemMain,
    QItemSide,
    QCollapsible
  } from 'quasar-framework'

  export default {
    name: 'SideBar',
    components: {
      QList,
      QListHeader,
      QSideLink,
      QItemMain,
      QItemSide,
      QCollapsible
    },
    data () {
      return {
        boughtOpened: false
      }
    }
  }
</script>
