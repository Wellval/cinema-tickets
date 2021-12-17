<template>
  <div class="hall-form">
    <div class="hall-names">
      <div
        :class="hall._id === currentHall._id ? 'active' : ''"
        @click="currentHall = hall"
        v-for="hall in $store.state.halls"
      >{{hall.name}}</div>
    </div>
    <form v-if="currentHall" @submit.prevent="submitHandler" class="hall-form">
      <app-input v-model="currentHall.name" :value="currentHall.name" :placeholder="'Hall name'"></app-input>
      <div class="radio-wrapper">
        <label v-for="item in $store.state.seats">
          <input type="radio" :value="item.category" v-model="seat" />
          <component :is="`app-${item.category}`"></component>
        </label>
      </div>
      <app-button type="button" @click="addSeat">Add seat</app-button>
      <app-button type="button" @click="currentHall.rows.push([])">Add row</app-button>
      <div class="rows-wrapper">
        <div class="row" v-for="(row, index) of currentHall.rows || [[]]">
          <p class="cross" @click="currentHall.rows.splice(index, 1)">x</p>
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
      <app-button :disabled="disabled" type="submit">Edit</app-button>
      <div v-if="edited">Added successfully!</div>
    </form>
  </div>
</template>

<script>
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import AppLoveSeat from "./seats/AppLoveSeat";
import AppRecliner from "./seats/AppRecliner";
import AppSofa from "./seats/AppSofa";
import axios from "axios";

export default {
  data() {
    return {
      currentRow: 1,
      currentHall: "",
      seat: "recliner",
      edited: false
    };
  },
  updated() {
    this.$store.dispatch("getHalls");
  },
  computed: {
    disabled() {
      let arraysLength = this.currentHall.rows.every(row => row.length > 0);
      if (
        this.currentHall.rows.length < 1 ||
        !arraysLength ||
        !this.currentHall.name
      ) {
        return true;
      }
      return false;
    }
  },
  methods: {
    addSeat() {
      if (this.currentHall.rows[this.currentRow - 1].length <= 10) {
        this.currentHall.rows[this.currentRow - 1].push({
          status: "available",
          seat: this.$store.state.seats.find(
            seat => seat.category === this.seat
          )
        });
      }
    },
    submitHandler() {
      console.log(this.currentHall.rows);
      axios.put(`http://localhost:5500/hall/${this.currentHall._id}`, {
        name: this.currentHall.name,
        rows: this.currentHall.rows
      });
    }
  },
  components: {
    AppInput,
    AppButton,
    AppLoveSeat,
    AppSofa,
    AppRecliner
  }
};
</script>
