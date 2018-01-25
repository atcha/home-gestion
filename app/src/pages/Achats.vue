<template>
  <div class="achats-container container">
    <h4>Gestion de vos achats</h4>
    <q-tabs>
      <q-route-tab
        icon="add"
        to="/achats/add"
        label="Ajouts"
        slot="title"
      />
      <q-route-tab
        icon="pie chart"
        to="/achats/stats"
        label="statistiques"
        slot="title"
      />
      <q-route-tab
        icon="build"
        to="/achats/config"
        label="configurations"
        slot="title"
      />
      <router-view></router-view>
    </q-tabs>
  </div>
</template>

<script>
  import {
    QTabs,
    QTab,
    QRouteTab,
    QBtn,
    QList,
    QCard,
    QCardTitle,
    QCardMain
  } from 'quasar-framework'

  export default {
    name: 'achats',
    components: {
      QTabs,
      QTab,
      QRouteTab,
      QBtn,
      QList,
      QCard,
      QCardTitle,
      QCardMain
    },
    data () {
      return {
      }
    },
    mounted () {
    }
  }
</script>

<style lang="stylus">
  @import './achats/achats.styl';
</style>
