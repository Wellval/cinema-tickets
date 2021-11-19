<template>
  <div class="filter-container">
    <button class="filter">{{ name }}</button>
    <select>
      <option>
          <label for="city1">City 1</label>
          <input name="cities" v-model="filterOption" type="checkbox" value="city1" />
      </option>
      <option>
        <input name="cities" v-model="filterOption" type="checkbox" value="city2" />
      </option>
      <option>
        <input name="cities" v-model="filterOption" type="checkbox" value="city3" />
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filterOption: ''
    }
  },
  props: ['name'],
  computed: {

  }
}
</script>

<style lang="scss">

.filter-container {
    position: relative;
    height: 30px;

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

    select {
        position: absolute;
        height: 100%;
        top: 0;
        right: 0;
        background: transparent;
        border: none;
        color: white;
        outline: none;
    }
}
</style>
