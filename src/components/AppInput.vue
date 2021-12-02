<template>
  <input
    :type="placeholder || 'text'"
    :placeholder="placeholder"
    @input="$emit('changed', currentInput, placeholder)"
    v-model="currentInput"
    :class="error !== '' ? 'app-input redOutline' : 'app-input'"
  />
  <small>{{error}}</small>
</template>

<script>
export default {
  props: ['placeholder', 'input'],
  emits: ['changed'],
  data () {
    return {
      currentInput: this.input
    }
  },
  methods: {
    validEmail (email) {
      var re = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
      return re.test(email)
    }
  },
  computed: {
    error () {
      if (
        this.placeholder === 'email' &&
        !this.validEmail(this.input) &&
        this.input.length > 0
      ) {
        return 'Invalid email'
      } else if (
        this.placeholder === 'password' &&
        this.input.length < 6 &&
        this.input.length !== 0
      ) {
        return 'Invalid password'
      } else return ''
    }
  }
}
</script>
