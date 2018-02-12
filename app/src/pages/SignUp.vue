<template>
  <div class="row justify-center items-center" style="min-height: calc(100vh - 50px);">
    <q-card>
      <q-card-title>Créons un compte !</q-card-title>
      <q-card-separator/>
      <q-card-main>
        <q-field
          icon="email"
          error-label="We need a valid email"
        >
          <q-input float-label="Votre e-mail" v-model="email" />
        </q-field>
        <q-field icon="lock">
          <q-input type="password" float-label="Votre mot de passe" max-length="16" v-model="password" />
        </q-field>
        <q-btn color="primary" @click="register">S'enregistrer</q-btn>
        <p>Ou retourner sur la <router-link to="/login">page de connexion</router-link>.</p>
      </q-card-main>
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
    QCardMedia,
    QInput,
    QField,
    QBtn,
    SessionStorage
  } from 'quasar-framework'

  // let usersRef = firebase.database().ref('utilisateurs')
  export default {
    name: 'signup',
    components: {
      QCard,
      QCardMain,
      QCardTitle,
      QCardSeparator,
      QCardMedia,
      QInput,
      QField,
      QBtn
    },
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      register: function () {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(user => {
            SessionStorage.set('authenticate', true)
            this.$router.replace('/home')
          },
          err => {
            alert('Oops. ' + err.message)
          })
      }
    }
  }
</script>

<style scoped>

</style>
