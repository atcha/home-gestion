<template>
  <q-list separator>
    <q-list-header>Vos statistiques d'achat</q-list-header>
    <div class="row">
      <div class="col-6">
        <q-card>
            <q-card-title>
              Nombre de produits achetés par mois cette année
            </q-card-title>
            <q-card-main>
              <line-chart :chart-data="nbProductMonthCollection" :options="nbProductOptions"></line-chart>
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
      <div class="col-6">
        <q-card>
          <q-card-title>
            Produits les plus achetés
          </q-card-title>
          <q-card-main>
            <line-chart :chart-data="nbProductCollection" :options="nbProductOptions"></line-chart>
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
        nbProducts: {
          labels: [],
          nb: []
        },
        nbProductsMonths: {
          months: [],
          nb: []
        },
        nbProductCollection: null,
        nbProductMonthCollection: null,
        nbProductOptions: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.$http.get('/api/stats/products/count')
          .then((results) => {
            let productLabel = results.body.map(nbproducts => nbproducts.label)
            let productNb = results.body.map(nbproducts => nbproducts.nb)

            this.nbProducts.labels.push(productLabel)
            this.nbProducts.nb.push(productNb)
            this.nbProductCollection = {
              labels: this.nbProducts.labels[0],
              datasets: [
                {
                  label: 'Nombre de produit',
                  backgroundColor: '#f87979',
                  data: this.nbProducts.nb[0]
                }
              ]
            }
          })

        this.$http.get('/api/stats/products/count/months')
          .then((results) => {
            console.log(results.body)
            let months = results.body.map(nbproducts => nbproducts.month)
            // results.body.map(nbproducts => nbproducts.nb)
            let productNb = []
            let i = 0
            while (i < 12) {
              productNb[i] = 0
              results.body.forEach(product => {
                if (product.month === i + 1) {
                  productNb[i] = product.nb
                }
              })
              i++
            }

            console.log(productNb)

            this.nbProductsMonths.months.push(months)
            this.nbProductsMonths.nb.push(productNb)
            this.nbProductMonthCollection = {
              labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
              datasets: [
                {
                  label: 'Nombre de produit',
                  backgroundColor: '#f87979',
                  data: this.nbProductsMonths.nb[0]
                }
              ]
            }
          })
      }
    }
  }
</script>
