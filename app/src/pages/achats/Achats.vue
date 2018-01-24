<template>
  <div class="achats-container container">
    <h4>Gestion de vos achats</h4>
    <q-tabs>
      <q-tab default slot="title" name="add" label="Ajouts" icon="add" />
      <q-tab slot="title" name="stats" label="statistiques" icon="pie chart" />
      <!--<q-tab slot="title" name="confs" label="configurations" icon="build" />-->
      <q-route-tab
        icon="build"
        to="/achats/config"
        label="configurations"
        exact
        slot="title"
      />

      <q-tab-pane name="add">
        <div class="container-form">
          <q-alert
            color="warning"
            icon="warning"
            dismissible
            enter="fadeIn"
            leave="fadeOut"
            v-model="displayAddPurchaseAlert"
          >
            Avant d'ajouter un nouvel achat, vous devez renseigner des rayons et des magasins au préalable.<br />
            Rendez-vous dans l'onglet configurations.
          </q-alert>
          <div class="form-purchase row sm-gutter">
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
                v-model="shelve"
                :options="shelves"
                multiple
                radio
              />
            </div>
            <div class="col">
              <q-select
                float-label="Magasins"
                v-model="store"
                :options="stores"
              />
            </div>
          </div>
          <div class="row">
            <q-btn color="primary" @click="submitPurchase">Ajouter</q-btn>
          </div>
        </div>
      </q-tab-pane>
      <q-tab-pane name="stats">Tab Three</q-tab-pane>
    </q-tabs>
  </div>
</template>

<script>
  import {
    QTabs,
    QTab,
    QTabPane,
    QRouteTab,
    QInput,
    QSelect,
    QBtn,
    QList,
    QCollapsible,
    QCard,
    QCardTitle,
    QCardMain,
    QDataTable,
    Alert,
    QAlert,
    Dialog,
    Toast
  } from 'quasar-framework'

  export default {
    name: 'achats',
    components: {
      QTabs,
      QTab,
      QTabPane,
      QRouteTab,
      QInput,
      QSelect,
      QBtn,
      QList,
      QCollapsible,
      QCard,
      QCardTitle,
      QCardMain,
      QDataTable,
      Alert,
      QAlert,
      Dialog,
      Toast
    },
    data () {
      return {
        name: '',
        store: {
          label: '',
          value: ''
        },
        stores: [],
        shelve: {
          label: '',
          value: ''
        },
        shelves: [],
        price: '',
        priceWeight: '',
        canAddPurchase: false,
        displayAddPurchaseAlert: false
      }
    },
    mounted () {
      Promise.all([this.getStores(), this.getShelves()])
        .then(() => {
          if (this.stores.length > 0 && this.shelves.length > 0) {
            this.canAddPurchase = true
          }
        })
    },
    methods: {
      getStores () {
        this.$http.get('/api/stores')
          .then((stores) => {
            this.stores = stores.body
          })
      },
      getShelves () {
        this.$http.get('/api/shelves')
          .then((shelves) => {
            this.shelves = shelves.body
          })
      },
      submitPurchase () {
        if (!this.canAddPurchase) {
          this.displayAddPurchaseAlert = true
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import 'achats.styl';
</style>
