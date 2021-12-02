<template>
  <div class="navbar">
    <div class="navbar-container">
      <div>LOGO</div>
      <ul>
        <li><router-link to="/movies">Movies</router-link></li>
        <li><router-link to="/manage">Manage</router-link></li>
        <li @click="modalWindowOpen = true">Log in</li>
      </ul>
    </div>
  </div>
  <app-modal-window
    @close-modal="close"
    v-if="modalWindowOpen"
  >
  </app-modal-window>
</template>

<script>
import AppModalWindow from './AppModalWindow'

export default {
  data () {
    return {
      modalWindowOpen: false
    }
  },
  methods: {
    close () {
      this.modalWindowOpen = false
    }
  },
  components: {
    AppModalWindow
  }
}
</script>
