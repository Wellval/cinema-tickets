<template>
  <div>
    <p>{{hall.name}}</p>
    <div class="seats-wrapper" v-for="(row, index) of session.hallRows" :key="row">
      <div v-for="item of row" :class="item.status === 'toBook' ? 'toBook': ''" :key="item">
        <component
          v-if="seats.find(seat => seat._id === item.seat._id)"
          @click="add(item)"
          :is="`app-${item.seat.category}`"
        ></component>
      </div>
    </div>
    <div v-for="(ticket, index) in tickets" :key="ticket._id">
      <div class="seat-name" v-if="ticket.status === 'toBook'">
        {{ticket.seat.category[0].toUpperCase() + ticket.seat.category.substring(1)}}: {{ticket.seat.price}}$
        <i
          class="far fa-trash-alt"
          @click="removeSeat(ticket)"
        ></i>
      </div>
    </div>
    <hr />
    <div v-if="tickets.length > 1">Total: {{totalPrice}}$</div>
    <app-button @click="payment = true">Book</app-button>
  </div>
</template>

<script>
import AppRecliner from "./seats/AppRecliner";
import AppLoveSeat from "./seats/AppLoveSeat";
import AppSofa from "./seats/AppSofa";
import AppButton from "./AppButton";

export default {
  data() {
    return {
      tickets: []
    };
  },
  props: ["hall", "session", "seats"],
  methods: {
    add(item) {
      if (item.status === "toBook") {
        item.status = "available";
        this.tickets.splice(this.tickets.indexOf(item), 1);
        console.log(this.tickets);
      } else {
        item.status = "toBook";
        this.tickets.push(item);
      }
    },
    removeSeat(ticket) {
      console.log(ticket);
      ticket.status = "available";
      this.tickets.splice(this.tickets.indexOf(ticket), 1);
    }
  },
  computed: {
    totalPrice() {
      let total = this.tickets.reduce(function(total, currentValue) {
        return total + currentValue.seat.price;
      }, 0);
      return total;
    }
  },
  components: {
    AppRecliner,
    AppLoveSeat,
    AppSofa,
    AppButton
  }
};
</script>