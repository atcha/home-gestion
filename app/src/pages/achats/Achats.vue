<template>
  <div class="achats-container container">
    <h4>Gestion de vos achats</h4>
    <q-tabs>
      <q-tab default slot="title" name="add" label="Ajouts" icon="add" />
      <q-tab slot="title" name="stats" label="statistiques" icon="pie chart" />
      <q-tab slot="title" name="confs" label="configurations" icon="build" />

      <q-tab-pane name="add">
        <div class="form-purchase row sm-gutter wrap">
          <div class="col-4">
            <q-input
              float-label="Nom du produit"
              v-model="name" />
          </div>
          <div class="col-2">
            <q-input
              float-label="Prix du produit"
              v-model="price" :after="[
                {
                  icon: 'euro symbol'
                }
              ]" />
          </div>
          <div class="col">
            <q-input
              float-label="Prix au kg"
              v-model="priceWeight" :after="[
                {
                  icon: 'euro symbol'
                }
              ]" />
          </div>
          <div class="col">
            <q-select
              float-label="Rayons"
              v-model="shelving"
              :options="shelvings"
              multiple
              radio />
          </div>
          <div class="col">
            <q-select
              float-label="Magasins"
              v-model="store"
              :options="stores" />
          </div>
        </div>
        <div class="row">
          <q-btn color="primary" @click="submit">Ajouter</q-btn>
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
    QSelect,
    QBtn
  } from 'quasar-framework'

  export default {
    name: 'achats',
    components: {
      QTabs,
      QTab,
      QTabPane,
      QInput,
      QSelect,
      QBtn
    },
    data () {
      return {
        name: '',
        price: '',
        priceWeight: '',
        store: '',
        shelving: [],
        stores: [],
        shelvings: []
      }
    },
    mounted () {
      this.getStores()
      this.getShelvings()
    },
    methods: {
      getStores () {
        this.$http.get('/api/stores')
          .then((stores) => {
            this.stores = stores.body
          })
      },
      getShelvings () {
        this.$http.get('/api/shelvings')
          .then((shelvings) => {
            this.shelvings = shelvings.body
          })
      },
      submit () {
        console.log('ok')
      }
    }
  }
</script>

<style lang="stylus">
  @import 'achats.styl';
</style>
