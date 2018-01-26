<template>
  <q-list separator>
    <q-list-header>Ajouter un achat</q-list-header>
    <q-item class="column items-stretch sm-gutter">
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
      <div class="container-form">
          <div class="form-purchase row sm-gutter">
            <div class="col-3">
              <q-input
                float-label="Nom du produit"
                v-model="purchase.name" />
            </div>
            <div class="col-2">
              <q-input
                float-label="Prix du produit"
                v-model="purchase.price" :after="[
                  {
                    icon: 'euro symbol'
                  }
                ]" />
            </div>
            <div class="col-2">
              <q-input
                float-label="Prix au kg"
                v-model="purchase.weightPrice" :after="[
                  {
                    icon: 'euro symbol'
                  }
                ]" />
            </div>
            <div class="col">
              <q-select
                stack-label="Rayons"
                v-model="shelve"
                :options="shelves"
                multiple
                radio
              />
            </div>
            <div class="col">
              <q-select
                stack-label="Magasins"
                v-model="store"
                :options="stores"
              />
            </div>
            <div class="col-2">
              <q-input
                stack-label="Date d'achat"
                v-model="purchase.date"
                type="date"
              />
            </div>
          </div>
        </div>
      <div>
        <q-btn color="primary" @click="submitPurchase">Ajouter</q-btn>
      </div>
    </q-item>
    <q-item-separator />
    <q-list-header>Liste des achats</q-list-header>
    <q-item>
      <q-data-table
        :data="purchases"
        :config="dataPurchaseConfig"
        :columns="dataPurchaseColumns"
      >
        <!-- Custom renderer for "message" column -->
        <template slot="col-purchaselabel" slot-scope="cell">
          <span class="light-paragraph">{{cell.data}}</span>
        </template>
        <!-- Custom renderer for "source" column -->
        <template slot="col-purchasename" slot-scope="cell">
          <span class="label text-white bg-negative">{{cell.data}}</span>
        </template>
        <!-- Custom renderer when user selected one or more rows -->
        <template slot="selection" slot-scope="selection">
          <q-btn color="primary" @click="modifyPurchase(selection)">
            <i>edit</i>
          </q-btn>
          <q-btn color="primary" @click="deletePurchase(selection)">
            <i>delete</i>
          </q-btn>
        </template>
      </q-data-table>
    </q-item>
  </q-list>
</template>

<script>
  import {
    QInput,
    QSelect,
    QBtn,
    QList,
    QListHeader,
    QItem,
    QItemSeparator,
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
    name: 'achatsadd',
    components: {
      QInput,
      QSelect,
      QBtn,
      QList,
      QListHeader,
      QItem,
      QItemSeparator,
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
        purchase: {
          name: '',
          price: '',
          weightPrice: '',
          shelveLabel: '',
          storeLabel: '',
          date: ''
        },
        purchases: [],
        price: '',
        priceWeight: '',
        canAddPurchase: false,
        displayAddPurchaseAlert: false,
        dataPurchaseConfig: {
          title: 'Liste des achats',
          refresh: false,
          noHeader: false,
          columnPicker: false,
          bodyStyle: {
            maxHeight: '500px'
          },
          rowHeight: '50px',
          responsive: true,
          pagination: {
            rowsPerPage: 15,
            options: [5, 10, 15, 30, 50, 500]
          },
          selection: 'single',
          // (optional) Override default messages when no data is available
          // or the user filtering returned no results.
          messages: {
            noData: 'aucune donnée disponible.',
            noDataAfterFiltering: 'Aucun résultat. Veuillez afiner votre recherche.'
          },
          // (optional) Override default labels. Useful for I18n.
          labels: {
            columns: 'Colonnes',
            allCols: 'Toutes les colonnes',
            rows: 'Lignes',
            selected: {
              singular: 'achat sélectionné.',
              plural: 'achats sélectionnés.'
            },
            clear: 'Désélectionner',
            search: 'Rechercher',
            all: 'Tout',
            delete: 'supprimer'
          }
        },
        dataPurchaseColumns: [
          {
            label: 'Nom du produit',
            field: 'name',
            width: '140px',
            classes: 'bg-orange-2',
            filter: true
          },
          {
            label: 'Prix unitaire',
            field: 'price',
            filter: true,
            width: '70px'
          },
          {
            label: 'Prix au kg',
            field: 'weightPrice',
            filter: true,
            width: '70px'
          },
          {
            label: 'Rayon',
            field: 'shelveLabel',
            filter: true,
            width: '70px'
          },
          {
            label: 'Magasin',
            field: 'storeLabel',
            filter: true,
            width: '70px'
          },
          {
            label: 'Date d\'achat',
            field: 'date',
            filter: true,
            width: '70px'
          }
        ]
      }
    },
    mounted () {
      Promise.all([this.getStores(), this.getShelves()])
        .then(() => {
          if (this.stores.length > 0 && this.shelves.length > 0) {
            this.canAddPurchase = true
          }
        })
      this.getPurchases()
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
      getPurchases () {
        this.$http.get('/api/purchases')
          .then((purchases) => {
            this.purchases = purchases.body
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
