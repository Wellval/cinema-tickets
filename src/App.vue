<template>
        <component :is="layout"><router-view/></component>
</template>

<script>
import EmptyLayout from './layouts/EmptyLayout'
import MainLayout from './layouts/MainLayout'
import TheHeader from './components/TheHeader'

export default {
  computed: {
    layout () {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
  components: {
    TheHeader, MainLayout, EmptyLayout
  }
}
</script>
