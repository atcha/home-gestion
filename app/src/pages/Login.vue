<template>
  <q-card>
    <q-card-title>Login</q-card-title>
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
      <q-btn color="primary" @click="login">Connexion</q-btn>
    </q-card-main>
  </q-card>
</template>
<script>
  import {
    QCard,
    QCardMain,
    QCardTitle,
    QCardSeparator,
    QCardMedia,
    QInput,
    QField,
    QBtn
  } from 'quasar-framework'

  let usersRef = firebase.database().ref('utilisateurs')
  // let emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  export default {
    name: 'login',
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
        password: '',
        name: '',
        access_token: null,
        response: null
      }
    },
    // computed property for form validation state
    computed: {
      validation: function () {
        return {
          name: !!this.newUser.name.trim(),
          email: emailRE.test(this.newUser.email)
        }
      },
      isValid: function () {
        var validation = this.validation
        return Object.keys(validation).every(function (key) {
          return validation[key]
        })
      }
    },
    methods: {
      addUser: function () {
        if (this.isValid) {
          usersRef.push(this.newUser)
          this.newUser.name = ''
          this.newUser.email = ''
        }
      }
    }
  }
</script>
<style lang="stylus">
</style>
