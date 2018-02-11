<template>
  <q-list separator>
    <q-list-header>Vos statistiques d'achat</q-list-header>
    <div class="row">
      <div class="col-12 col-md-6">
        <q-card>
            <q-card-title>
              Nombre de produits achetés par mois cette année
            </q-card-title>
            <q-card-main>
              <line-chart :chart-data="nbProductMonthCollection" :options="nbProductOptions"></line-chart>
            </q-card-main>
        </q-card>
      </div>
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-title>
            Produits achetés par magasins
            <q-select
              stack-label="Produits achetés"
              v-model="productSelected"
              :options="boughtProducts"
              toggle
              @change="boughtProductChange"/>
            <line-chart v-if="productSelected" :chart-data="nbProductStoreCollection" :options="nbProductOptions"></line-chart>
            <q-alert
              v-if="!productSelected"
              color="info"
              icon="info"
              dismissible
              enter="fadeIn"
              leave="fadeOut"
            >
              Veuillez sélectionner un produit pour voir les stats d'achats de celui-ci par magasin.
            </q-alert>
          </q-card-title>
          <q-card-main>
          </q-card-main>
        </q-card>
      </div>
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-title>
            Produits les plus achetés
          </q-card-title>
          <q-card-main>
            <doughnut-chart :chart-data="nbProductCollection"></doughnut-chart>
          </q-card-main>
        </q-card>
      </div>
    </div>
  </q-list>
</template>

<script>
  import LineChart from '../../components/BartChart'
  import DoughnutChart from '../../components/DoughnutChart'
  import {
    QList,
    QListHeader,
    QCard,
    QCardTitle,
    QCardMain,
    QCardSeparator,
    QItem,
    QSelect,
    Alert,
    QAlert
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
      LineChart,
      DoughnutChart,
      QSelect,
      Alert,
      QAlert
    },
    data () {
      return {
        products: null,
        productSelected: null,
        boughtProducts: [],
        stores: null,
        nbProducts: {
          labels: [],
          nb: []
        },
        nbProductsMonths: {
          months: [],
          nb: []
        },
        nbProductsStore: {
          labels: [],
          nb: []
        },
        nbProductCollection: null,
        nbProductMonthCollection: null,
        nbProductStoreCollection: null,
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
      this.getBoughtProducts()
    },
    methods: {
      getBoughtProducts () {
        this.$http.get('/api/stats/products/bought')
          .then((results) => {
            this.boughtProducts = results.data
          })
      },
      fillData () {
        this.$http.get('/api/stats/products/count')
          .then((results) => {
            let productLabel = results.data.map(nbproducts => nbproducts.label)
            let productNb = results.data.map(nbproducts => nbproducts.nb)
            let color = []

            productNb.forEach(() => {
              color.push(this.getRandomColor())
            })

            this.nbProducts.labels.push(productLabel)
            this.nbProducts.nb.push(productNb)
            this.nbProductCollection = {
              labels: this.nbProducts.labels[0],
              datasets: [
                {
                  label: 'Nombre de produit',
                  backgroundColor: color,
                  data: this.nbProducts.nb[0]
                }
              ]
            }
          })

        this.$http.get('/api/stats/products/count/months')
          .then((results) => {
            let months = results.data.map(nbproducts => nbproducts.month)
            let productNb = []
            let i = 0
            while (i < 12) {
              productNb[i] = 0
              results.data.forEach(product => {
                if (product.month === i + 1) {
                  productNb[i] = product.nb
                }
              })
              i++
            }

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
      },
      getRandomColor () {
        const letters = '0123456789ABCDEF'
        let color = '#'
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)]
        }
        return color
      },
      boughtProductChange () {
        console.log(this.productSelected)
        this.$http.get('/api/stats/products/count/stores', {params: {product: this.productSelected}})
          .then((results) => {
            this.nbProductsStore.labels = []
            this.nbProductsStore.nb = []
            let storeLabel = results.data.map(results => results.label)
            let productNb = results.data.map(results => results.nb)
            let color = this.getRandomColor()

            this.nbProductsStore.labels.push(storeLabel)
            this.nbProductsStore.nb.push(productNb)
            this.nbProductStoreCollection = {
              labels: this.nbProductsStore.labels[0],
              datasets: [
                {
                  label: 'Nombre d\'achats par magasin du produit ' + results.data[0].productLabel,
                  backgroundColor: color,
                  data: this.nbProductsStore.nb[0]
                }
              ]
            }
          })
      }
    }
  }
</script>
