<template>
  <q-list separator>
    <q-list-header>Vos statistiques d'achat</q-list-header>
    <div class="row">
      <div class="col-6">
        <q-card>
            <q-card-title>
              Nombre de produits achetés par mois
            </q-card-title>
            <q-card-main>
            </q-card-main>
        </q-card>
      </div>
      <div class="col-6">
        <q-card>
          <q-card-title>
            Nombre de produits achetés ce mois-ci
          </q-card-title>
          <q-card-main>
            test
          </q-card-main>
        </q-card>
      </div>
      <div class="col-4">
        <q-card>
          <q-card-title>
            Produits les plus achetés
          </q-card-title>
          <q-card-main>
            <line-chart :chart-data="productCollection"></line-chart>
          </q-card-main>
        </q-card>
      </div>
    </div>
  </q-list>
</template>

<script>
  import LineChart from '../../components/BartChart'
  import {
    QList,
    QListHeader,
    QCard,
    QCardTitle,
    QCardMain,
    QCardSeparator,
    QItem
  } from 'quasar-framework'

  export default {
    name: 'achatsstats',
    components: {
      QList,
      QListHeader,
      QCard,
      QCardTitle,
      QCardMain,
      QCardSeparator,
      QItem,
      LineChart
    },
    data () {
      return {
        products: null,
        productDataCollection: null,
        datacollection: null
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
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
      fillData () {
        this.datacollection = {
          labels: [this.getRandomInt(), this.getRandomInt()],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      }
    }
  }
</script>
