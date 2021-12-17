<template>
  <form @submit.prevent="submitHandler" class="hall-form">
    <app-input v-model="name" :placeholder="'Hall name'"></app-input>
    <div class="radio-wrapper">
      <label>
        <input type="radio" value="recliner" visibility="hidden" v-model="seat" />
        <app-recliner></app-recliner>
      </label>
      <label>
        <input type="radio" value="love-seat" v-model="seat" />
        <app-love-seat></app-love-seat>
      </label>
      <label>
        <input type="radio" value="sofa" v-model="seat" />
        <app-sofa></app-sofa>
      </label>
    </div>
    <app-button type="button" @click="addSeat">Add seat</app-button>
    <app-button type="button" @click="rows.push([])">Add row</app-button>
    <div class="rows-wrapper">
      <div class="row" v-for="(row, index) of rows">
        <label class="row-label">
          <input type="radio" :value="index + 1" v-model="currentRow" />
          <span>{{index + 1}}</span>
        </label>
        <div class="seats">
          <component v-for="item in row" :is="`app-${item.seat.category}`"></component>
        </div>
      </div>
    </div>
    <app-button :disabled="disabled" type="submit">Add</app-button>
  </form>
</template>

<script>
import axios from "axios";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import AppLoveSeat from "./seats/AppLoveSeat";
import AppRecliner from "./seats/AppRecliner";
import AppSofa from "./seats/AppSofa";

export default {
  props: ["category"],
  async mounted() {
    await this.$store.dispatch("getSeats");
  },
  data() {
    return {
      rows: [[]],
      seat: "recliner",
      currentRow: 1,
      name: ""
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
      axios.post("http://localhost:5500/hall/add", {
        name: this.name,
        rows: this.rows
      });
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
          ),
          position: 1
        });
      }
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

<style lang="scss">
[type="radio"] {
  visibility: hidden;
}

.seats {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.add-forms-container .hall-form {
  width: 100%;

  input {
    width: 350px;
  }

  label {
    width: 50px;
    margin-right: 10px;
    svg {
      width: 50px;
    }
  }

  .row-label {
    width: 20px;
  }
}

.radio-wrapper {
  display: flex;
}

.rows-wrapper {
  display: flex;
  flex-direction: column;

  label:hover {
    cursor: pointer;
  }

  [type="radio"]:checked + span {
    color: #ff4545;
  }

  .row {
    height: 100%;
    margin-top: 20px;
    display: flex;
  }
}

svg:hover {
  cursor: pointer;
}

[type="radio"]:checked + svg g svg path {
  fill: #ff4545;
}
</style>