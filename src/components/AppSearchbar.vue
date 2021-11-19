<template>
  <form id="search-bar" @submit.prevent="onSubmit">
    <button class="btn-search">
      <i class="fas fa-search"></i>
    </button>
    <input
      v-model="$store.state.search"
      type="text"
      class="input-search"
      placeholder="Search by title..."
    />
  </form>
</template>

<script>
export default {

}
</script>
