<template>
  <q-list class="purchase-conf-tab" separator>
    <q-list-header>Configuration des magasins et rayons</q-list-header>
    <q-collapsible icon="store" label="Magasins" :sublabel="makeSubLabel(stores.length, 'magasin')">
      <q-list>
        <q-list-header>Ajouter un magasin</q-list-header>
        <q-item>
          <div class="form-purchase row sm-gutter">
            <div class="col-12 col-md-6">
              <q-input
                error-label="Ce champ est obligatoire."
                float-label="Nom du magasin"
                v-model="store.label"
                ref="storeLabel"
                @blur="$v.store.label.$touch"
                :error="$v.store.label.$error"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                error-label="Ce champ est obligatoire."
                float-label="Valeur du magasin"
                v-model="store.value"
                @blur="$v.store.value.$touch"
                :error="$v.store.value.$error"/>
            </div>
            <input type="hidden" v-model="idEditedStore" v-if="storeMode === 'edit'">
          </div>
          <div class="row sm-gutter">
            <div class="col-2" v-if="storeMode === 'add'">
              <q-btn color="primary" @click="submitConfig('store', 'add')">Ajouter</q-btn>
            </div>
            <div class="col-2" v-if="storeMode === 'edit'">
              <q-btn color="primary" @click="submitConfig('store', 'edit')">Modifier</q-btn>
            </div>
            <div class="col-2" v-if="storeMode === 'edit'">
              <q-btn color="secondary" @click="eraseConfig('store')">Effacer</q-btn>
            </div>
          </div>
        </q-item>
        <q-list-header>Liste des magasins</q-list-header>
        <q-item-separator/>
        <q-item>
          <q-data-table
            :data="stores"
            :config="dataStoreConfig"
            :columns="dataStoreColumns"
          >
            <!-- Custom renderer for "message" column -->
            <template slot="col-storelabel" slot-scope="cell">
              <span class="light-paragraph">{{cell.data}}</span>
            </template>
            <!-- Custom renderer for "source" column -->
            <template slot="col-storevalue" slot-scope="cell">
              <span class="label text-white bg-negative">{{cell.data}}</span>
            </template>
            <!-- Custom renderer when user selected one or more rows -->
            <template slot="selection" slot-scope="selection">
              <q-btn color="primary" @click="modifyConfig('store', selection)">
                <i>edit</i>
              </q-btn>
              <q-btn color="primary" @click="deleteConfig('store', selection)">
                <i>delete</i>
              </q-btn>
            </template>
          </q-data-table>
        </q-item>
      </q-list>
    </q-collapsible>
    <q-collapsible icon="list" label="Rayons" :sublabel="makeSubLabel(shelves.length, 'rayon')">
      <q-list>
        <q-list-header>Ajouter un Rayon de magasin</q-list-header>
        <q-item>
          <div class="form-purchase row sm-gutter">
            <div class="col-12 col-md-6">
              <q-input
                error-label="Ce champ est obligatoire."
                float-label="Nom du rayon (ex : salle de bain)"
                v-model="shelve.label"
                ref="shelveLabel"
                @blur="$v.shelve.label.$touch"
                :error="$v.shelve.label.$error"/>
            </div>
            <div class="col-12 col-md-6">
              <q-input
                error-label="Ce champ est obligatoire."
                float-label="Valeur du rayon"
                v-model="shelve.value"
                @blur="$v.shelve.value.$touch"
                :error="$v.shelve.value.$error"/>
            </div>
            <input type="hidden" v-model="idEditedShelve" v-if="shelveMode === 'edit'">
          </div>
          <div class="row sm-gutter">
            <div class="col-2" v-if="shelveMode === 'add'">
              <q-btn color="primary" @click="submitConfig('shelve', 'add')">Ajouter</q-btn>
            </div>
            <div class="col-2" v-if="shelveMode === 'edit'">
              <q-btn color="primary" @click="submitConfig('shelve', 'edit')">Modifier</q-btn>
            </div>
            <div class="col-2" v-if="shelveMode === 'edit'">
              <q-btn color="secondary" @click="eraseConfig('shelve')" v-if="shelveMode === 'edit'">Effacer</q-btn>
            </div>
          </div>
        </q-item>
        <q-item-separator/>
        <q-list-header>Liste des rayons</q-list-header>
        <q-item>
          <q-data-table
            :data="shelves"
            :config="dataShelveConfig"
            :columns="dataStoreColumns"
          >
            <!-- Custom renderer for "message" column -->
            <template slot="col-shelvelabel" slot-scope="cell">
              <span class="light-paragraph">{{cell.data}}</span>
            </template>
            <!-- Custom renderer for "source" column -->
            <template slot="col-shelvevalue" slot-scope="cell">
              <span class="label text-white bg-negative">{{cell.data}}</span>
            </template>
            <!-- Custom renderer when user selected one or more rows -->
            <template slot="selection" slot-scope="selection">
              <q-btn color="primary" @click="modifyConfig('shelve', selection)">
                <i>edit</i>
              </q-btn>
              <q-btn color="primary" @click="deleteConfig('shelve', selection)">
                <i>delete</i>
              </q-btn>
            </template>
          </q-data-table>
        </q-item>
      </q-list>
    </q-collapsible>
    <q-collapsible icon="label" label="Produits" :sublabel="makeSubLabel(products.length, 'produit')">
      <q-list>
        <q-list-header>Ajouter un produit</q-list-header>
        <q-item>
          <div class="form-purchase row sm-gutter">
            <div class="col-12 col-md-4">
              <q-input
                error-label="Ce champ est obligatoire."
                float-label="Nom du produit"
                v-model="product.label"
                ref="productLabel"
                @blur="$v.product.label.$touch"
                :error="$v.product.label.$error"/>
            </div>
            <div class="col-12 col-md-4">
              <q-input
                float-label="Description du produit"
                v-model="product.description"/>
            </div>
            <div class="col-12 col-md-4">
              <q-input
                float-label="Commentaire sur le produit"
                v-model="product.commentaire"/>
            </div>
            <input type="hidden" v-model="idEditedProduct" v-if="productMode === 'edit'">
          </div>
          <div class="row sm-gutter">
            <div class="col-2" v-if="productMode === 'add'">
              <q-btn color="primary" @click="submitConfig('product', 'add')">Ajouter</q-btn>
            </div>
            <div class="col-2" v-if="productMode === 'edit'">
              <q-btn color="primary" @click="submitConfig('product', 'edit')">Modifier</q-btn>
            </div>
            <div class="col-2" v-if="productMode === 'edit'">
              <q-btn color="secondary" @click="eraseConfig('product')" v-if="productMode === 'edit'">Effacer</q-btn>
            </div>
          </div>
        </q-item>
        <q-item-separator/>
        <q-list-header>Liste des produits</q-list-header>
        <q-item>
          <q-data-table
            :data="products"
            :config="dataProductConfig"
            :columns="dataProductColumns"
          >
            <!-- Custom renderer when user selected one or more rows -->
            <template slot="selection" slot-scope="selection">
              <q-btn color="primary" @click="modifyConfig('product', selection)">
                <i>edit</i>
              </q-btn>
              <q-btn color="primary" @click="deleteConfig('product', selection)">
                <i>delete</i>
              </q-btn>
            </template>
          </q-data-table>
        </q-item>
      </q-list>
    </q-collapsible>
  </q-list>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'
  import {
    QTabPane,
    QInput,
    QSelect,
    QBtn,
    QList,
    QListHeader,
    QItem,
    QItemSeparator,
    QCollapsible,
    QDataTable,
    Alert,
    QAlert,
    Dialog,
    Toast
  } from 'quasar-framework'

  export default {
    name: 'achatsconf',
    components: {
      QTabPane,
      QInput,
      QSelect,
      QBtn,
      QList,
      QListHeader,
      QItem,
      QItemSeparator,
      QCollapsible,
      QDataTable,
      Alert,
      QAlert,
      Dialog,
      Toast
    },
    data () {
      return {
        store: {
          label: '',
          value: ''
        },
        stores: [],
        idEditedStore: null,
        shelve: {
          label: '',
          value: ''
        },
        shelves: [],
        idEditedShelve: null,
        product: {
          label: '',
          description: '',
          commentaire: ''
        },
        products: [],
        idEditedProduct: null,
        storeMode: 'add',
        shelveMode: 'add',
        productMode: 'add',
        dataStoreConfig: {
          title: 'Liste des magasins enregistrés',
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
              singular: 'magasin sélectionné.',
              plural: 'magasins sélectionnés.'
            },
            clear: 'Désélectionner',
            search: 'Rechercher',
            all: 'Tout',
            delete: 'supprimer'
          }
        },
        dataStoreColumns: [
          {
            label: 'Nom du magasin',
            field: 'label',
            width: '140px',
            classes: 'bg-orange-2',
            filter: true
          },
          {
            label: 'Valeur pour le code',
            field: 'value',
            filter: true,
            width: '70px'
          }
        ],
        dataShelveConfig: {
          title: 'Liste des rayons enregistrés',
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
              singular: 'magasin sélectionné.',
              plural: 'magasins sélectionnés.'
            },
            clear: 'Désélectionner',
            search: 'Rechercher',
            all: 'Tout',
            delete: 'supprimer'
          }
        },
        dataProductConfig: {
          title: 'Liste des produits enregistrés',
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
              singular: 'magasin sélectionné.',
              plural: 'magasins sélectionnés.'
            },
            clear: 'Désélectionner',
            search: 'Rechercher',
            all: 'Tout',
            delete: 'supprimer'
          }
        },
        dataProductColumns: [
          {
            label: 'Nom du produit',
            field: 'label',
            width: '140px',
            classes: 'bg-orange-2',
            filter: true
          },
          {
            label: 'Description',
            field: 'description',
            filter: true,
            width: '70px'
          },
          {
            label: 'Commentaire',
            field: 'commentaire',
            filter: true,
            width: '70px'
          }
        ]
      }
    },
    validations: {
      product: {
        label: { required }
      },
      store: {
        label: { required },
        value: { required }
      },
      shelve: {
        label: { required },
        value: { required }
      }
    },
    mounted () {
      this.getStores()
      this.getShelves()
      this.getProducts()
    },
    methods: {
      getStores () {
        this.$http.get('/api/stores')
          .then((stores) => {
            this.stores = stores.data
          })
      },
      getShelves () {
        this.$http.get('/api/shelves')
          .then((shelves) => {
            this.shelves = shelves.data
          })
      },
      getProducts () {
        this.$http.get('/api/products')
          .then((products) => {
            this.products = products.data
          })
      },
      modifyConfig (type, selected) {
        if (type === 'store') {
          this.storeMode = 'edit'
          this.store.label = selected.rows[0].data.label
          this.store.value = selected.rows[0].data.value
          this.idEditedStore = selected.rows[0].data.id
          this.$refs.storeLabel.focus()
        }
        else if (type === 'shelve') {
          this.shelveMode = 'edit'
          this.shelve.label = selected.rows[0].data.label
          this.shelve.value = selected.rows[0].data.value
          this.idEditedShelve = selected.rows[0].data.id
          this.$refs.shelveLabel.focus()
        }
        else {
          this.productMode = 'edit'
          this.product.label = selected.rows[0].data.label
          this.product.description = selected.rows[0].data.description
          this.product.commentaire = selected.rows[0].data.commentaire
          this.idEditedProduct = selected.rows[0].data.id
          this.$refs.productLabel.focus()
        }
      },
      deleteConfig (type, selected) {
        Dialog.create({
          title: 'Attention',
          message: 'Voulez-vous vraiment supprimer cette ligne ?',
          buttons: [
            {
              label: 'Annuler',
              handler: () => {}
            },
            {
              label: 'Confirmer',
              handler: () => {
                console.log(selected.rows[0].data)
                if (type === 'store') {
                  this.$http.delete('/api/stores/' + selected.rows[0].data.id)
                    .then(() => {
                      this.getStores()
                      Toast.create('Magasin supprimé !')
                    })
                }
                else if (type === 'shelve') {
                  this.$http.delete('/api/shelves/' + selected.rows[0].data.id)
                    .then(() => {
                      this.getShelves()
                      Toast.create('Rayon supprimé !')
                    })
                }
                else {
                  this.$http.delete('/api/products/' + selected.rows[0].data.id)
                    .then(() => {
                      this.getProducts()
                      Toast.create('Produit supprimé !')
                    })
                }
              }
            }
          ]
        })
      },
      eraseConfig (type) {
        if (type === 'store') {
          this.store.label = ''
          this.store.value = ''
          this.idEditedStore = null
        }
        else if (type === 'shelve') {
          this.shelve.label = ''
          this.shelve.value = ''
          this.idEditedShelve = null
        }
        else {
          this.product.label = ''
          this.product.description = ''
          this.product.commentaire = ''
          this.idEditedProduct = null
        }
      },
      submitConfig (type, mode) {
        if (type === 'store') {
          if (mode === 'add') {
            this.$v.store.label.$touch()
            this.$v.store.value.$touch()
            if (this.$v.store.label.$error || this.$v.store.value.$error) {
              Toast.create.negative({
                html: 'Des champs obligatoires ne sont pas remplis',
                icon: 'warning'
              })
              return
            }
            this.$http.post('/api/stores', this.store)
              .then((store) => {
                this.stores.push(store.data[0])
                this.store.label = ''
                this.store.value = ''
                Toast.create('Nouveau magasin ajouté.')
              })
          }
          else {
            this.$http.put('/api/stores/' + this.idEditedStore, this.store)
              .then((store) => {
                this.getStores()
                this.storeMode = 'add'
                this.store.label = ''
                this.store.value = ''
                this.idEditedStore = null
                Toast.create('Magasin ' + this.store.label + ' modifié.')
              })
          }
        }
        else if (type === 'shelve') {
          if (mode === 'add') {
            this.$v.shelve.label.$touch()
            this.$v.shelve.value.$touch()
            if (this.$v.shelve.label.$error || this.$v.shelve.value.$error) {
              Toast.create.negative({
                html: 'Des champs obligatoires ne sont pas remplis',
                icon: 'warning'
              })
              return
            }
            this.$http.post('/api/shelves', this.shelve)
              .then((shelve) => {
                this.shelves.push(shelve.data[0])
                this.shelve.label = ''
                this.shelve.value = ''
                Toast.create('Nouveau rayon ajouté.')
              })
          }
          else {
            this.$http.put('/api/shelves/' + this.idEditedShelve, this.shelve)
              .then((shelve) => {
                this.getShelves()
                this.shelveMode = 'add'
                this.shelve.label = ''
                this.shelve.value = ''
                this.idEditedShelve = null
                Toast.create('Rayon ' + this.shelve.label + ' modifié.')
              })
          }
        }
        else {
          if (mode === 'add') {
            this.$v.product.label.$touch()
            if (this.$v.product.label.$error) {
              Toast.create.negative({
                html: 'Des champs obligatoires ne sont pas remplis',
                icon: 'warning'
              })
              return
            }
            this.$http.post('/api/products', this.product)
              .then((product) => {
                this.products.push(product.data[0])
                this.product.label = ''
                this.product.description = ''
                this.product.commentaire = ''
                Toast.create('Nouveau produit ajouté.')
              })
          }
          else {
            this.$http.put('/api/products/' + this.idEditedProduct, this.product)
              .then((product) => {
                this.getShelves()
                this.productMode = 'add'
                this.product.label = ''
                this.product.description = ''
                this.product.commentaire = ''
                this.idEditedProduct = null
                Toast.create('produit ' + this.product.label + ' modifié.')
              })
          }
        }
      },
      makeSubLabel (number, text) {
        let subLabel = ''
        switch (number) {
          case 0:
            break
          case 1:
            subLabel = number + ' ' + text
            break
          default:
            subLabel = number + ' ' + text + 's'
        }
        return subLabel
      }
    }
  }
</script>

<style lang="stylus">
  @import './achats-conf.styl';
</style>
