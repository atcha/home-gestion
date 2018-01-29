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
            <div class="col-6">
              <q-field :count="150">
                <q-input
                  type="text"
                  float-label="Nom du produit"
                  v-model="terms"
                >
                  <q-autocomplete
                    separator
                    :min-characters="3"
                    @search="searchProduct"
                  />
                </q-input>
              </q-field>
            </div>
            <div class="col-3">
              <q-field>
                <q-input
                  type="text"
                  float-label="Prix du produit"
                  v-model="purchase.price" :after="[
                    {
                      icon: 'euro symbol'
                    }
                  ]" />
              </q-field>
            </div>
            <div class="col-3">
              <q-field>
                <q-input
                  type="text"
                  float-label="Prix au kg"
                  v-model="purchase.weightPrice" :after="[
                    {
                      icon: 'euro symbol'
                    }
                  ]" />
              </q-field>
            </div>
            <div class="col-4">
              <q-field icon="reorder">
                <q-select
                  stack-label="Rayons"
                  v-model="shelve"
                  :options="shelves"
                  multiple
                  toggle
                  @change="shelveChange"
                />
              </q-field>
            </div>
            <div class="col-4">
              <q-field icon="store">
                <q-select
                  stack-label="Magasins"
                  v-model="store"
                  :options="stores"
                />
              </q-field>
            </div>
            <div class="col-4">
              <q-field icon="date range">
                <q-datetime
                  v-model="purchase.date"
                  type="date"
                  float-label="Date d'achat"
                  format="DD-MM-YYYY"
                />
              </q-field>
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
    QField,
    QInput,
    QDatetime,
    QAutocomplete,
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
    filter
  } from 'quasar-framework'

  export default {
    name: 'achatsadd',
    components: {
      QField,
      QInput,
      QDatetime,
      QAutocomplete,
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
      QAlert
    },
    data () {
      return {
        name: '',
        store: {
          label: '',
          value: ''
        },
        stores: [],
        shelve: [],
        shelves: [],
        purchase: {
          price: '',
          weightPrice: '',
          shelveLabel: '',
          storeLabel: '',
          date: ''
        },
        terms: '',
        purchases: [],
        purchasesData: [],
        products: [],
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
            label: 'Id',
            field: 'id',
            width: '20px'
          },
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
            width: '70px',
            format (value) {
              return value + ' &euro;'
            }
          },
          {
            label: 'Prix au kg',
            field: 'weightPrice',
            filter: true,
            width: '70px',
            format (value) {
              return value + ' &euro;'
            }
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
            field: 'purchase_date',
            filter: true,
            width: '70px',
            format (value) {
              return new Date(value).toLocaleDateString()
            }
          }
        ]
      }
    },
    mounted () {
      Promise.all([this.getStores(), this.getShelves()])
        .then(() => {
          if (this.stores.length > 0 && this.shelves.length > 0) {
            this.canAddPurchase = true
            this.getPurchases()
          }
        })
      this.getProducts()
    },
    methods: {
      getStores () {
        return this.$http.get('/api/stores')
          .then((stores) => {
            this.stores = stores.body
            return this.stores
          })
      },
      getShelves () {
        return this.$http.get('/api/shelves')
          .then((shelves) => {
            this.shelves = shelves.body
            console.log(this.shelves)
            return this.shelves
          })
      },
      shelveChange (value) {
        console.log(value)
      },
      getProducts () {
        this.$http.get('/api/products')
          .then((products) => {
            this.products = products.body
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
        else {

        }
      },
      searchProduct (terms, done) {
        done(filter(terms, {field: 'label', list: this.products}))
      }
    }
  }
</script>

<style lang="stylus">
  @import 'achats.styl';
</style>
