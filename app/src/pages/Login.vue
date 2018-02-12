<template>
  <div class="row justify-center items-center" style="min-height: calc(100vh - 50px);">
    <q-card class="text-center col-12 col-md-3">
      <q-card-title class="bg-darken">
        <object type="image/svg+xml" data="~assets/logo-home-gestion-white.svg" width="128" height="128">
          <img src="~assets/logo-home-gestion.png" width="128" height="128" />
        </object>
        <h4 class="text-white">Connectez-vous</h4>
      </q-card-title>
      <q-card-separator/>
      <q-card-main class="bg-white">
        <q-field error-label="We need a valid email" class="text-left">
          <q-input float-label="e-mail" v-model="email" />
        </q-field>
        <q-field class="text-left">
          <q-input type="password" float-label="Mot de passe" max-length="16" v-model="password" />
        </q-field>
      </q-card-main>
      <q-card-actions class="bg-grey-11 inline-block vertical-middle">
        <q-btn color="secondary" @click="login" class="full-width" style="margin-top: 15px;">Connexion</q-btn>
        <p style="margin-top: 15px;">Pas de compte ? <router-link to="/sign-up">Créez le maintenant.</router-link></p>
      </q-card-actions>
    </q-card>
  </div>
</template>
<script>
  import firebase from 'firebase'
  import {
    QCard,
    QCardMain,
    QCardTitle,
    QCardSeparator,
    QCardActions,
    QInput,
    QField,
    QBtn,
    SessionStorage
  } from 'quasar-framework'

  export default {
    name: 'login',
    components: {
      QCard,
      QCardMain,
      QCardTitle,
      QCardSeparator,
      QCardActions,
      QInput,
      QField,
      QBtn
    },
    data () {
      return {
        email: '',
        password: '',
        name: '',
        access_token: null,
        response: null
      }
    },
    methods: {
      login: function () {
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.email, this.password)
          .then(user => {
            SessionStorage.set('authenticate', true)
            this.$router.replace('/home')
          }, err => {
            alert('Oops. ' + err.message)
          })
      }
    }
  }
</script>
<style lang="stylus">
</style>
