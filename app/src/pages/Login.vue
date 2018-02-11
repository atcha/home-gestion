<template>
  <q-card>
    <q-card-title>Login</q-card-title>
    <q-card-separator/>
    <q-card-main>
      <q-field>
        <q-input></q-input>
      </q-field>
      <q-field>
        <q-input></q-input>
      </q-field>
      <q-btn></q-btn>
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
        name: ''
      }
    },
    methods: {
      login: function () {
        let email = this.email
        let password = this.password
        this.$auth.login({email, password})
          .then(function () {
            // Execute application logic after successful login
          })
      },

      register: function () {
        let name = this.name
        let email = this.email
        let password = this.password
        this.$auth.register({name, email, password})
          .then(function () {
            // Execute application logic after successful registration
          })
      }
    }
  }
</script>
<style lang="stylus">
</style>
