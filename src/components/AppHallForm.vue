<template>
  <div class="forms">
    <app-hall-form-add></app-hall-form-add>
  </div>
</template>

<script>
import AppHallFormAdd from "./AppHallFormAdd";

export default {
  data() {
    return {
      edit: false
    };
  },
  components: {
    AppHallFormAdd,
  }
};
</script>