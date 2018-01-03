<template>
  <div class="achats-container container">
    <h4>Gestion de vos achats</h4>
    <q-tabs>
      <q-tab default slot="title" name="add" label="Ajouts" icon="add" />
      <q-tab slot="title" name="stats" label="statistiques" icon="pie chart" />
      <q-tab slot="title" name="confs" label="configurations" icon="build" />

      <q-tab-pane name="add">
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
          <q-btn color="primary" @click="submitPurchase">Ajouter</q-btn>
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
                        v-model="store" />
                    </div>
                    <div class="col-6">
                      <q-input
                        float-label="Valeur du magasin"
                        v-model="store" />
                    </div>
                  </div>
                <div class="row">
                  <q-btn color="primary" @click="submitStore">Ajouter</q-btn>
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
                    <template slot="col-storelabel" scope="cell">
                      <span class="light-paragraph">{{cell.data}}</span>
                    </template>
                    <!-- Custom renderer for "source" column -->
                    <template slot="col-storevalue" scope="cell">
                      <span class="label text-white bg-negative">{{cell.data}}</span>
                    </template>
                    <!-- Custom renderer when user selected one or more rows -->
                    <template slot="selection" scope="selection">
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
          <q-collapsible icon="list" label="Rayons">
            <div>
              Content
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
    QDataTable
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
      QDataTable
    },
    data () {
      return {
        name: '',
        price: '',
        priceWeight: '',
        store: '',
        shelving: [],
        stores: [],
        shelvings: [],
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
            all: 'Tout'
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
      submitPurchase () {
        console.log('ok')
      },
      submitStore () {
        console.log('ok')
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
      },
      modifyStore (selected) {
        console.log(selected)
      },
      deleteStore (selected) {
        console.log(selected)
      }
    }
  }
</script>

<style lang="stylus">
  @import 'achats.styl';
</style>
