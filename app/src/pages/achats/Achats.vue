<template>
  <div class="achats-container container">
    <h4>Gestion de vos achats</h4>
    <q-tabs>
      <q-tab default slot="title" name="add" label="Ajouts" icon="add" />
      <q-tab slot="title" name="stats" label="statistiques" icon="pie chart" />
      <q-tab slot="title" name="confs" label="configurations" icon="build" />

      <q-tab-pane name="add">
        <div class="form-purchase">
          <q-input
            float-label="Nom du produit"
            v-model="name" />
          <q-input
            float-label="Prix du produit"
            v-model="price" :after="[
              {
                icon: 'euro symbol'
              }
            ]" />
          <q-select
            float-label="Rayons"
            v-model="shelving"
            :options="shelvings"
            multiple="true"
            radio="true" />
          <q-select
            float-label="Magasins"
            v-model="store"
            :options="stores" />
        </div>
      </q-tab-pane>
      <q-tab-pane name="stats">Tab Three</q-tab-pane>
      <q-tab-pane name="confs">Tab Two</q-tab-pane>
    </q-tabs>
  </div>
</template>

<script>
  import {
    QTabs,
    QTab,
    QTabPane,
    QInput,
    QSelect
  } from 'quasar-framework'
  export default {
    name: 'achats',
    components: {
      QTabs,
      QTab,
      QTabPane,
      QInput,
      QSelect
    },
    data () {
      return {
        name: '',
        price: '',
        store: '',
        shelving: [],
        stores: [
          {
            label: 'Monoprix',
            value: 'monop'
          },
          {
            label: 'Carrefour',
            value: 'carrefour'
          }
        ],
        shelvings: [
          {
            label: 'Salle de bain',
            value: 'bathroom'
          },
          {
            label: 'Cuisine',
            value: 'kitchen'
          }
        ]
      }
    }
  }
</script>

<style lang="stylus">
  @import 'achats.styl';
</style>
