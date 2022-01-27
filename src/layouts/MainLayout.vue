<template>
    <the-header />
    <div class="main-layout">
        <router-view />
    </div>
</template>

<script>
import TheHeader from '../components/TheHeader'

export default {
  components: {
    TheHeader
  }
}
</script>

<style lang="scss">
    .main-layout {
        margin: 30px 50px;
        width: 80%;
        justify-content: center;
        display: flex;
        flex-direction: column;
        position: relative;
    }
</style>
