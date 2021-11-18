<template>
  <button class="filter">{{ name }}</button>
</template>

<script>
export default {
  props: ['name']
}
</script>

<style lang="scss">
.filter {
  width: 200px;
  height: 30px;
  color: white;
  background-color: transparent;
  border: white 2px solid;
  align-items: center;
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 2px;
}
</style>
