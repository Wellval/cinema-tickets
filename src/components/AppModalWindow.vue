<template>
  <div class="layout" @click="onClickOutside"></div>
  <div class="modal-window-container">
    <h3>{{ register ? 'Register' : 'Log in' }}</h3>
    <form @submit.prevent="submitHandler" class="login-form">
      <app-input
        v-for="key in Object.keys(userData)"
        :key="key + Math.random()"
        :placeholder="key"
        :input="userData[key]"
        @changed="changed"
      ></app-input>
      <app-button class="dark-button" v-if="!register">Log in</app-button>
      <p @click="register = true" v-if="!register">Register</p>
      <app-button v-else class="dark-button">Register</app-button>
    </form>
  </div>
</template>

<script>
import vClickOutside from 'click-outside-vue3'
import AppButton from './AppButton'
import AppInput from './AppInput'
import axios from 'axios'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  data () {
    return {
      userData: {
        email: '',
        password: ''
      },
      register: false
    }
  },
  methods: {
    onClickOutside () {
      this.$emit('close-modal')
      this.register = false
    },
    registerUser () {
      axios
        .get('http://localhost:5500/users', {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })
        .then(response => console.log(response))
    },
    login () {
      console.log('log')
    },
    changed (input, placeholder) {
      const key = Object.keys(this.userData).find(key => key === placeholder)
      this.userData[key] = input
    },
    submitHandler () {
      if (this.register) {
        this.registerUser()
      } else this.login()
    }
  },
  emits: ['close-modal'],
  components: {
    AppButton,
    AppInput
  }
}
</script>
