<template>
  <div class="row justify-center items-center" style="min-height: calc(100vh - 50px);">
    <q-card class="text-center col-12 col-md-3">
      <q-card-title class="bg-darken">
        <object type="image/svg+xml" data="~assets/logo-home-gestion-white.svg" width="128" height="128">
          <img src="~assets/logo-home-gestion.png" width="128" height="128" />
        </object>
        <h4 class="text-white">Créons un compte</h4>
      </q-card-title>
      <q-card-separator/>
      <q-card-main class="bg-white">
        <q-field error-label="Le pseudo est obligatoire" class="text-left">
          <q-input
            float-label="Pseudo"
            v-model="pseudo"
            @blur="$v.pseudo.$touch"
            :error="$v.pseudo.$error"
          />
        </q-field>
        <q-field error-label="Votre e-mail n'est pas valide" class="text-left">
          <q-input
            float-label="E-mail"
            v-model="email"
            @blur="$v.email.$touch"
            :error="$v.email.$error"
          />
        </q-field>
        <q-field error-label="Le mot de passe est obligatoire" class="text-left">
          <q-input
            type="password"
            float-label="Mot de passe"
            max-length="16"
            v-model="password"
            @blur="$v.password.$touch"
            :error="$v.password.$error"
          />
        </q-field>
        <q-field error-label="Le mot de passe n'est pas identique" class="text-left">
          <q-input
            type="password"
            float-label="Confirmer mot de passe"
            max-length="16"
            @keyup.enter="register"
            v-model="confirmpassword"
            @blur="$v.confirmpassword.$touch"
            :error="$v.confirmpassword.$error"
          />
        </q-field>
      </q-card-main>
      <q-card-actions class="bg-grey-11 inline-block vertical-middle">
        <q-btn color="secondary" @click="register" class="full-width" style="margin-top: 15px;">S'enregistrer</q-btn>
        <p style="margin-top: 15px;">Ou retourner sur la <router-link to="/login">page de connexion</router-link>.</p>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
  import {
    QCard,
    QCardMain,
    QCardTitle,
    QCardSeparator,
    QCardMedia,
    QCardActions,
    QInput,
    QField,
    QBtn,
    Dialog,
    Toast
  } from 'quasar-framework'

  export default {
    name: 'signup',
    components: {
      QCard,
      QCardMain,
      QCardTitle,
      QCardSeparator,
      QCardMedia,
      QCardActions,
      QInput,
      QField,
      QBtn
    },
    data () {
      return {
        pseudo: '',
        email: '',
        password: '',
        confirmpassword: '',
        user: {
          uid: '',
          pseudo: '',
          email: '',
          profile_picture: '/statics/users/nobody_m.original.jpg'
        }
      }
    },
    validations: {
      pseudo: { required },
      email: { required, email },
      password: {
        required,
        minLength: minLength(6)
      },
      confirmpassword: {
        sameAsPassword: sameAs('password')
      }
    },
    methods: {
      register: function () {
        // Check fields and send error
        this.$v.pseudo.$touch()
        this.$v.email.$touch()
        this.$v.password.$touch()
        this.$v.confirmpassword.$touch()
        if (this.$v.pseudo.$error) {
          Toast.create('Pseudo obligatoire.')
          return
        }
        if (this.$v.email.$error) {
          Toast.create('E-mail non valide.')
          return
        }
        if (this.$v.password.$error) {
          Toast.create('Mot de passe obligatoire.')
          return
        }
        if (this.$v.confirmpassword.$error) {
          Toast.create('Le mot de passe doit être identique.')
          return
        }
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(user => {
            console.log(user)
            this.user.uid = user.uid
            this.user.pseudo = this.pseudo
            this.user.email = this.email
            this.$http.post('/api/users', this.user)
              .then(() => {
                this.senEmailVerification()
                setTimeout(() => {
                  this.$router.replace('/login')
                }, 3000)
              })
          },
          err => {
            alert('Oops. ' + err.message)
          })
      },
      senEmailVerification: function () {
        firebase.auth().currentUser.sendEmailVerification()
          .then(() => {
            Dialog.create({
              title: 'E-mail de verification envoyé',
              message: 'Un e-mail de verification a été envoyé à votre adresse. <br /> Pour pouvoir vous connecter merci de cliquer sur le lien de verification',
              buttons: [
                {
                  label: 'Ok',
                  handler () {
                  }
                }
              ]
            })
          })
      }
    }
  }
</script>

<style scoped>

</style>
