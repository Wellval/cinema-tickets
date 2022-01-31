<template>
  <form @submit.prevent="submitHandler" class="hall-form">
    <app-input v-model="name" :placeholder="'Hall name'"></app-input>
    <div class="radio-wrapper">
      <label v-for="item in $store.state.seats">
        <input type="radio" :value="item.category" v-model="seat" />
        <component :is="`app-${item.category}`"></component>
      </label>
    </div>
    <app-button type="button" @click="addSeat">Add seat</app-button>
    <app-button type="button" @click="rows.push([])">Add row</app-button>
    <div class="rows-wrapper">
      <div class="row" v-for="(row, index) of rows">
        <p class="cross" @click="rows.splice(index, 1)">x</p>
        <label class="row-label">
          <input type="radio" :value="index + 1" v-model="currentRow" />
          <span>{{index + 1}}</span>
        </label>
        <div class="seats">
          <component
            @click="row.splice(item, 1)"
            v-for="item in row"
            :is="`app-${item.seat.category}`"
          ></component>
        </div>
      </div>
    </div>
    <app-button :disabled="disabled" type="submit">Add</app-button>
    <div v-if="added">Added successfully!</div>
  </form>
</template>

<script>
import axios from "axios";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import AppLoveSeat from "./seats/AppLoveSeat";
import AppRecliner from "./seats/AppRecliner";
import AppSofa from "./seats/AppSofa";
import AppHallFormEdit from "./AppHallFormEdit";

export default {
  async mounted() {
    await this.$store.dispatch("getSeats");
  },
  data() {
    return {
      rows: [[]],
      seat: "recliner",
      currentRow: 1,
      name: "",
      added: false
    };
  },
  computed: {
    disabled() {
      let arraysLength = this.rows.every(row => row.length > 0);
      if (this.rows.length < 1 || !arraysLength || !this.name) {
        return true;
      }
      return false;
    }
  },
  methods: {
    submitHandler() {
      axios
        .post("https://cinema-tickets-back.herokuapp.com/hall/add", {
          name: this.name,
          rows: this.rows
        })
        .then(result => {
          result ? (this.added = true) : (this.added = false);
        });
      setTimeout(() => {
        this.added = false;
      }, 2000);
      this.$store.state.halls.push({
        name: this.name,
        rows: this.rows
      });
    },
    addSeat() {
      if (this.rows[this.currentRow - 1].length <= 10) {
        this.rows[this.currentRow - 1].push({
            status: "available",
            seat: this.$store.state.seats.find(
              seat => seat.category === this.seat
            )
          }
        );
      }
    }
  },
  components: {
    AppInput,
    AppButton,
    AppLoveSeat,
    AppSofa,
    AppRecliner,
    AppHallFormEdit
  }
};
</script>
