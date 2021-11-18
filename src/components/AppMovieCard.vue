<template>
  <div class="movie-card_wrapper">
    <div class="poster">
      <img :src="url" />
    </div>
    <div class="title">{{ title }}</div>
    <p class="movie-card_plot">{{plot}}</p>
  </div>
</template>

<script>
export default {
  props: ['url', 'title', 'plot']
}
</script>
