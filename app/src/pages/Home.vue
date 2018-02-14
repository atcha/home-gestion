<template>
  <div class="home container">
    <h5>Bienvenue, {{ user.pseudo }}</h5>
    <p class="caption">Cette application te permet de gérer tes achats et tes budgets personnels ou de groupe.</p>
    <p class="caption">Si tu as besoin d'informations n'hésite pas à consulter l'aide disponible en haut à droite de l'écran.</p>

  </div>
</template>

<script>
  import {
    SessionStorage
  } from 'quasar-framework'

  export default {
    name: 'home',
    data () {
      return {
        user: {}
      }
    },
    mounted () {
      if (SessionStorage.get.item('currentUser')) {
        this.user = SessionStorage.get.item('currentUser')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
</style>
