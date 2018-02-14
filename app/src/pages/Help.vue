<template>
  <div class="container">
    <h5>Page d'aide</h5>
    <q-list>
      <q-collapsible icon="fa-pencil" label="Inscription et connexion">
        <div>
          Content
        </div>
      </q-collapsible>
      <q-collapsible icon="shopping basket" label="gestion des achats">
        <div>
          Content
        </div>
      </q-collapsible>
      <q-collapsible icon="assignment ind" label="Compte">
        <div>
          Content
        </div>
      </q-collapsible>
    </q-list>
  </div>
</template>

<script>
  import {
    QList,
    QCollapsible
  } from 'quasar-framework'

  export default {
    name: 'help',
    components: {
      QList,
      QCollapsible
    },
    data () {
      return {
      }
    },
    mounted () {
    }
  }
</script>

<style scoped>

</style>
