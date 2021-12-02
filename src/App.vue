<template>
        <component :is="layout"><router-view/></component>
</template>

<script>
import MainLayout from './layouts/MainLayout'
import TheHeader from './components/TheHeader'

export default {
  computed: {
    layout () {
      return (this.$route.meta.layout) + '-layout'
    }
  },
  components: {
    TheHeader, MainLayout
  }
}
</script>
