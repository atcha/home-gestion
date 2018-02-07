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
        Avant d'ajouter un nouvel achat, vous devez renseigner des rayons et des magasins au préalable.<br/>
        Rendez-vous dans l'onglet configurations.
      </q-alert>
      <div class="container-form">
        <div class="form-purchase row sm-gutter">
          <div class="col-6">
            <q-field :count="150" error-label="Ce champ est obligatoire.">
              <q-input
                type="text"
                float-label="Nom du produit"
                v-model="product.label"
                @blur="$v.product.label.$touch"
                :error="$v.product.label.$error"
              >
                <q-autocomplete
                  separator
                  :min-characters="3"
                  @search="searchProduct"
                  @selected="selectedProduct"
                />
              </q-input>
            </q-field>
          </div>
          <div class="col-3">
            <q-field error-label="Ce champ est obligatoire.">
              <q-input
                type="text"
                float-label="Prix du produit"
                v-model="purchase.price"
                :after="[
                    {
                      icon: 'euro symbol'
                    }
                  ]"
                @blur="$v.purchase.price.$touch"
                :error="$v.purchase.price.$error"
              />
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
                  ]"/>
            </q-field>
          </div>
          <div class="col-4">
            <q-field icon="reorder" error-label="Ce champ est obligatoire.">
              <q-select
                stack-label="Rayons"
                v-model="shelvesSelected"
                :options="shelves"
                multiple
                toggle
                @change="shelveChange"
                @blur="$v.shelvesSelected.$touch"
                :error="$v.shelvesSelected.$error"
              />
            </q-field>
          </div>
          <div class="col-4">
            <q-field icon="store" error-label="Ce champ est obligatoire.">
              <q-select
                stack-label="Magasins"
                v-model="store.value"
                :options="stores"
                @blur="$v.store.value.$touch"
                :error="$v.store.value.$error"
              />
            </q-field>
          </div>
          <div class="col-4">
            <q-field icon="date range" error-label="Ce champ est obligatoire.">
              <q-datetime
                v-model="purchase.date"
                type="date"
                float-label="Date d'achat"
                format="DD-MM-YYYY"
                @blur="$v.purchase.date.$touch"
                :error="$v.purchase.date.$error"
              />
            </q-field>
          </div>
        </div>
      </div>
      <div>
        <q-btn color="primary" @click="submitPurchase">Ajouter</q-btn>
      </div>
    </q-item>
    <q-item-separator/>
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
  import { required } from 'vuelidate/lib/validators'
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
    Toast,
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
      QAlert,
      Toast
    },
    data () {
      return {
        store: {
          label: '',
          value: ''
        },
        product: {
          label: ''
        },
        shelvesSelected: [],
        stores: [],
        shelves: [],
        purchase: {
          price: '',
          weightPrice: null,
          date: '',
          product: null,
          shelve: [],
          store: null
        },
        productSelected: null,
        purchases: [],
        products: [],
        price: '',
        priceWeight: '',
        canAddPurchase: false,
        displayAddPurchaseAlert: false,
        dataPurchaseConfig: {
          title: 'Liste des achats',
          refresh: false,
          noHeader: false,
          columnPicker: true,
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
            width: '20px',
            filter: true,
            sort: true
          },
          {
            label: 'Nom du produit',
            field: 'productLabel',
            width: '140px',
            classes: 'bg-orange-2',
            filter: true,
            sort: true,
            type: 'string'
          },
          {
            label: 'Prix unitaire',
            field: 'price',
            filter: true,
            sort: true,
            width: '70px',
            format (value) {
              return value + ' &euro;'
            }
          },
          {
            label: 'Prix au kg',
            field: 'weightPrice',
            filter: true,
            sort: true,
            width: '70px',
            format (value) {
              return value + ' &euro;'
            }
          },
          {
            label: 'Rayon',
            field: 'shelvesLabel',
            filter: true,
            sort: true,
            width: '70px'
          },
          {
            label: 'Magasin',
            field: 'storeLabel',
            filter: true,
            sort: true,
            type: 'string',
            width: '70px'
          },
          {
            label: 'Date d\'achat',
            field: 'purchaseDate',
            filter: true,
            sort: true,
            width: '70px',
            format (value) {
              return new Date(value).toLocaleDateString()
            }
          }
        ]
      }
    },
    validations: {
      product: {
        label: { required }
      },
      purchase: {
        price: { required },
        date: { required }
      },
      shelvesSelected: { required },
      store: {
        value: { required }
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
            return this.shelves
          })
      },
      shelveChange (value) {
      },
      getProducts () {
        this.$http.get('/api/products')
          .then((products) => {
            this.products = products.body.map(resource => {
              return {
                label: resource.label,
                id: resource.id,
                value: resource.label.toLowerCase()
              }
            })
          })
      },
      getPurchases () {
        this.$http.get('/api/purchases')
          .then((purchases) => {
            purchases.body.forEach((simplePurchase) => {
              let purchase = {
                id: '',
                price: '',
                purchaseDate: '',
                weightPrice: '',
                productLabel: '',
                storeLabel: '',
                shelvesLabel: ''
              }

              purchase.id = simplePurchase.id
              purchase.price = simplePurchase.price
              purchase.purchaseDate = simplePurchase.purchase_date
              purchase.weightPrice = simplePurchase.weight_price
              this.$http.get('/api/stores/' + simplePurchase.id_store)
                .then((store) => {
                  purchase.storeLabel = store.body[0].label
                  this.$http.get('/api/products/' + simplePurchase.id_product)
                    .then((product) => {
                      purchase.productLabel = product.body[0].label
                      this.purchases.push(purchase)
                      this.$http.get('/api/purchases/' + simplePurchase.id + '/shelves/')
                        .then((shelves) => {
                          shelves.body.forEach((shelve, index) => {
                            purchase.shelvesLabel = purchase.shelvesLabel.concat(shelve.label)
                            if (index < shelves.body.length - 1) {
                              purchase.shelvesLabel = purchase.shelvesLabel.concat(' ,')
                            }
                          })
                        })
                    })
                })
            })
          })
      },
      submitPurchase () {
        // Tests if fields are empty
        this.$v.product.label.$touch()
        this.$v.purchase.price.$touch()
        this.$v.shelvesSelected.$touch()
        this.$v.store.value.$touch()
        this.$v.purchase.date.$touch()
        if (this.$v.product.label.$error || this.$v.purchase.price.$error || this.$v.shelvesSelected.$error || this.$v.store.value.$error || this.$v.purchase.date.$error) {
          Toast.create('Des champs obligatoires ne sont pas remplis')
          return
        }

        // Test if there are no shelves or no stores
        if (!this.canAddPurchase) {
          this.displayAddPurchaseAlert = true
        }
        else {
          // Check if product is selected from autocomplete or if we have to create one
          if (this.productSelected != null) {
            this.purchase.product = this.productSelected
            this.purchase.shelve = this.shelvesSelected
            this.purchase.store = this.store
            this.$http.post('/api/purchases', this.purchase)
              .then((purchase) => {
                this.getPurchases()
              })
          }
          else {
            this.$http.post('/api/products', this.product)
              .then((product) => {
                this.purchase.product = product.body[0]
                this.products.push(product.body[0])
                this.purchase.shelve = this.shelvesSelected
                this.purchase.store = this.store
                this.$http.post('/api/purchases', this.purchase)
                  .then((purchase) => {
                    this.getPurchases()
                  })
              })
          }
        }
      },
      searchProduct (terms, done) {
        done(filter(terms, {field: 'label', list: this.products}))
      },
      selectedProduct (selected) {
        this.productSelected = selected
        console.log(this.productSelected)
      }
    }
  }
</script>

<style lang="stylus">
  @import 'achats.styl';
</style>
