<template>
  <div class="achats-container container">
    <h4>Gestion de vos achats</h4>
    <q-tabs>
      <q-tab default slot="title" name="add" label="Ajouts" icon="add" />
      <q-tab slot="title" name="stats" label="statistiques" icon="pie chart" />
      <q-tab slot="title" name="confs" label="configurations" icon="build" />

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
      <q-tab-pane name="confs">
        <q-list separator>
          <q-collapsible icon="store" label="Magasins" :sublabel="makeSubLabel(stores.length, 'magasin')" >
            <q-card>
              <q-card-title>
                Ajouter un magasin
              </q-card-title>
              <q-card-main>
                <div class="form-purchase row sm-gutter">
                    <div class="col-6">
                      <q-input
                        float-label="Nom du magasin"
                        v-model="store.label"
                        ref="storeLabel"
                      />
                    </div>
                    <div class="col-6">
                      <q-input
                        float-label="Valeur du magasin"
                        v-model="store.value" />
                </div>
                <input type="hidden" v-model="idEditedStore" v-if="editStoreMode">
                  </div>
                <div class="row">
                  <q-btn color="primary" @click="submitStore('add')" v-if="addStoreMode">Ajouter</q-btn>
                  <q-btn color="primary" @click="submitStore('edit')" v-if="editStoreMode">Modifier</q-btn>
                </div>
              </q-card-main>
            </q-card>
            <q-card>
              <q-card-title>
                Liste des magasins
              </q-card-title>
              <q-card-main>
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
                      <q-btn color="primary" @click="modifyStore(selection)">
                        <i>edit</i>
                      </q-btn>
                      <q-btn color="primary" @click="deleteStore(selection)">
                        <i>delete</i>
                      </q-btn>
                    </template>
                  </q-data-table>
              </q-card-main>
            </q-card>
          </q-collapsible>
          <q-collapsible icon="list" label="Rayons" :sublabel="makeSubLabel(shelves.length, 'rayon')">
            <div>
              <q-card>
                <q-card-title>
                  Ajouter un Rayon de magasin
                </q-card-title>
                <q-card-main>
                  <div class="form-purchase row sm-gutter">
                    <div class="col-6">
                      <q-input
                        float-label="Nom du rayon (ex : salle de bain)"
                        v-model="shelve.label" />
                    </div>
                    <div class="col-6">
                      <q-input
                        float-label="Valeur du rayon"
                        v-model="shelve.value" />
                    </div>
                    <input type="hidden" v-model="idEditedShelve" v-if="editShelveMode">
                  </div>
                  <div class="row">
                    <q-btn color="primary" @click="submitShelve('add')" v-if="addShelveMode">Ajouter</q-btn>
                    <q-btn color="primary" @click="submitShelve('edit')" v-if="editShelveMode">Modifier</q-btn>
                  </div>
                </q-card-main>
              </q-card>
              <q-card>
                <q-card-title>
                  Liste des rayons
                </q-card-title>
                <q-card-main>
                  <q-data-table
                    :data="shelves"
                    :config="dataStoreConfig"
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
                      <q-btn color="primary" @click="modifyShelve(selection)">
                        <i>edit</i>
                      </q-btn>
                      <q-btn color="primary" @click="deleteShelve(selection)">
                        <i>delete</i>
                      </q-btn>
                    </template>
                  </q-data-table>
                </q-card-main>
              </q-card>
            </div>
          </q-collapsible>
        </q-list>
      </q-tab-pane>
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
    QBtn,
    QList,
    QCollapsible,
    QCard,
    QCardTitle,
    QCardMain,
    QDataTable,
    Alert,
    QAlert
  } from 'quasar-framework'

  export default {
    name: 'achats',
    components: {
      QTabs,
      QTab,
      QTabPane,
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
      QAlert
    },
    data () {
      return {
        name: '',
        price: '',
        priceWeight: '',
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
        canAddPurchase: false,
        displayAddPurchaseAlert: false,
        addStoreMode: true,
        editStoreMode: false,
        addShelveMode: true,
        editShelveMode: false,
        dataStoreConfig: {
          title: 'Liste des magasins enregistrés',
          refresh: true,
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
    },
    methods: {
      getStores () {
        this.$http.get('/api/stores')
          .then((stores) => {
            this.stores = stores.body
          })
      },
      submitStore (mode) {
        if (mode === 'add') {
          this.$http.post('/api/stores', this.store)
            .then((store) => {
              this.stores.push(store.body[0])
            })
        }
        else {
          this.$http.put('/api/stores/' + this.idEditedStore, this.store)
            .then((store) => {
              this.getStores()
            })
        }
      },
      modifyStore (selected) {
        this.editStoreMode = true
        this.addStoreMode = false
        this.store.label = selected.rows[0].data.label
        this.store.value = selected.rows[0].data.value
        this.idEditedStore = selected.rows[0].data.id
      },
      deleteStore (selected) {
        this.$http.delete('/api/stores/' + selected.rows[0].data.id)
          .then((message) => {
            this.getStores()
          })
      },
      getShelves () {
        this.$http.get('/api/shelves')
          .then((shelves) => {
            this.shelves = shelves.body
            console.log(this.shelves)
          })
      },
      submitShelve (mode) {
        if (mode === 'add') {
          this.$http.post('/api/shelves', this.shelve)
            .then((shelve) => {
              this.shelves.push(shelve.body[0])
            })
        }
        else {
          this.$http.put('/api/shelves/' + this.idEditedShelve, this.shelve)
            .then((shelve) => {
              this.getShelves()
            })
        }
      },
      deleteShelve (selected) {
        this.$http.delete('/api/shelves/' + selected.rows[0].data.id)
          .then((message) => {
            this.getShelves()
          })
      },
      modifyShelve (selected) {
        this.editShelveMode = true
        this.addShelveMode = false
        this.shelve.label = selected.rows[0].data.label
        this.shelve.value = selected.rows[0].data.value
        this.idEditedShelve = selected.rows[0].data.id
      },
      submitPurchase () {
        if (!this.canAddPurchase) {
          this.displayAddPurchaseAlert = true
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
  @import 'achats.styl';
</style>
