<template>
  <div class="forms">
    <h3 @click="edit = !edit">{{ edit ? "To adding" : "To editing"}}</h3>
    <app-hall-form-add v-if="!edit"></app-hall-form-add>
    <app-hall-form-edit v-else></app-hall-form-edit>
  </div>
</template>

<script>
import AppHallFormAdd from "./AppHallFormAdd";
import AppHallFormEdit from "./AppHallFormEdit";

export default {
  data() {
    return {
      edit: false
    };
  },
  components: {
    AppHallFormAdd,
    AppHallFormEdit
  }
};
</script>