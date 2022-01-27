<template>
  <input
    :type="placeholder || 'text'"
    :placeholder="placeholder"
    @change="$emit('changed')"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :class="'app-input'"
  />
</template>

<script>
export default {
  props: ["placeholder", "input", "modelValue"],
  emits: ["changed", "update:modelValue"],
  data() {
    return {
      inputText: ""
    };
  }
};
</script>