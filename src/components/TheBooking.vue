<template>
  <div>
    <p>{{this.time === '0:0' ? '' : this.time}}</p>
    <p>{{hall.name}}</p>
    <div class="seats-wrapper" v-for="(row, index) of dataSession.hallRows" :key="row">
      <div v-for="item of row" :class="item.status" :key="item">
        <component
          v-if="seats.find(seat => seat._id === item.seat._id)"
          @click="add(item._id)"
          :is="`app-${item.seat.category}`"
        ></component>
      </div>
    </div>
    <div v-for="(ticket, index) in tickets" :key="ticket._id">
      <div
        class="seat-name"
      >{{ticket.seat.category[0].toUpperCase() + ticket.seat.category.substring(1)}}: {{ticket.seat.price}}$</div>
      <hr />
    </div>
    <div v-if="totalPrice > 0">Total: {{totalPrice}}$</div>
    <app-button :disabled="tickets.length < 1" @click="createCheckout">Buy</app-button>
  </div>
</template>

<script>
import AppRecliner from "./seats/AppRecliner";
import AppLoveSeat from "./seats/AppLoveSeat";
import AppSofa from "./seats/AppSofa";
import AppButton from "./AppButton";
import axios from "axios";
import io from "socket.io-client";
const socket = io("http://localhost:5500");
import VueSocketIO from "vue-3-socket.io";

export default {
  data() {
    return {
      tickets: [],
      dataSession: this.session,
      display: "jnbjhb",
      minutesLeft: 0,
      secondsLeft: 0
    };
  },
  sockets: {
    reserved(arg) {
      this.session.hallRows = JSON.parse(arg).hallRows;
      this.dataSession.hallRows = JSON.parse(arg).hallRows;
      for (let row of this.dataSession.hallRows) {
        for (let seat of row) {
          if (
            seat.status === "toBook" &&
            seat.userId !== this.$store.state.user._id
          ) {
            seat.status = "booked";
          }
        }
      }
    }
  },
  mounted() {
    this.$socket.emit("subscribe", this.session);
    for (let row of this.dataSession.hallRows) {
      for (let seat of row) {
        if (seat.status !== "booked") {
          seat.status = "available";
          this.$socket.emit("reserve", {
            session: this.dataSession,
            userId: seat.userId
          });
        }
      }
    }
  },
  unmounted() {
    this.$socket.disconnect(this.session);
  },
  props: ["hall", "session", "seats"],
  methods: {
    countdown(min, sec) {
      let i = setInterval(() => {
        if (sec > 0) {
          sec--;
        } else if (sec == 0 && min > 0) {
          sec = 59;
          min--;
        } else if (sec == 0 && min == 0) {
          this.secondsLeft = "";
          this.minutesLeft = "";
          clearInterval(i);
          this.tickets = []
          for (let row of this.dataSession.hallRows) {
            for (let seat of row) {
              if (seat.status === "toBook") {
                seat.status = "available";
                this.$socket.emit("reserve", {
                  session: this.dataSession,
                  userId: seat.userId
                });
              }
            }
          }
        }

        if (sec.toString().length === 1) {
          this.secondsLeft = "0" + sec;
        } else {
          this.secondsLeft = sec;
        }

        if (min.toString().length === 1) {
          this.minutesLeft = "0" + min;
        } else {
          this.minutesLeft = min;
        }
      }, 1000);
    },
    async add(id) {
      let item = undefined;

      for (let row of this.session.hallRows) {
        for (let obj of row) {
          if (obj._id === id) {
            item = obj;
            break;
          }
        }
      }

      if (item.status === "toBook") {
        item.status = "available";
        item.userId = "";
        this.tickets.splice(this.tickets.indexOf(item), 1);
      } else if (item.status === "available") {
        item.userId = this.$store.state.user._id;
        item.status = "toBook";
        this.tickets.push(item);
        if (this.tickets.length <= 1) {
          this.countdown(15, 0);
        }
      }
      this.$socket.emit("reserve", {
        session: this.session,
        userId: item.userId
      });
    },
    async createCheckout() {
      let stripe = Stripe(
        "pk_test_51KAAH6Dl91JA29TDwukCszEYeqxMTH6vdzVSHPZJdDu2NTuf8ra9dXLsHVVwrpepiJ0UXkvOITIiAzJ3nXET6lEw00GegpyEgy"
      );
      let params = {
        seatsQuantity: this.seatsQuantity,
        movie: this.session.movie
      };
      await axios
        .post("http://localhost:5500/stripe/add-checkout-session", params, {
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        })
        .then(async res => {
          Object.values(this.session.hallRows).map(obj =>
            Object.values(obj).map(val =>
              val.status === "toBook" ? (val.status = "booked") : ""
            )
          );
          this.bookSeat();
          stripe.redirectToCheckout({ sessionId: res.data.id });
        });
    },
    bookSeat() {
      axios
        .put(
          `http://localhost:5500/session/${this.session._id}/book`,
          {
            hallRows: this.session.hallRows,
            id: this.session._id
          },
          {
            headers: {
              "x-access-token": localStorage.getItem("token")
            }
          }
        )
        .then(res => {
          let newRows = Object.values(this.session.hallRows).map(obj =>
            Object.values(obj).map(val =>
              val.status === "toBook" ? (val.status = "booked") : ""
            )
          );
          console.log(res.data);
        });
    }
  },
  computed: {
    totalPrice() {
      let total = this.tickets.reduce(function(total, currentValue) {
        return total + currentValue.seat.price;
      }, 0);
      return total;
    },
    seatsQuantity() {
      let seats = {
        recliners: 0,
        loveseats: 0,
        sofas: 0
      };
      if (this.tickets.length > 0) {
        this.tickets.map(a => {
          console.log(a.seat.category.split("-"));
          seats[a.seat.category.split("-").join("") + "s"]++;
        });
      }
      return seats;
    },
    time() {
      return this.minutesLeft + ":" + this.secondsLeft;
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