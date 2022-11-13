<template>
  <div class="call" v-if="call_orders.length > 0">
    <div class="call_info">
      <v-row justify="center" class="accepted_order">
        <v-icon size="70" color="#fff" style="margin-top: 180px"
          >mdi-phone-outline</v-icon
        >
        <div class="infos_confirmation"></div>
        <div class="infos_confirmation1"></div>
      </v-row>
    </div>
    <div class="infos">
      <h2>Pedidos em espera</h2>
      <div class="mt-10"></div>
      <div
        class="info_list"
        v-for="call_order in call_orders"
        :key="call_order.id"
      >
        <h4>Nome: {{ call_order.user_name }}</h4>
        <h4>Produto: {{ call_order.product_name }}</h4>
        <h4>Tipo: {{ call_order.product_type }}</h4>
        <h4>Pagamento: PIX</h4>
        <h4>Extras:</h4>
        <v-chip v-for="extra in call_order.extras" :key="extra.id">
          {{ extra.name }}</v-chip
        >
        <h4>Total: R$ 20</h4>
        <v-btn rounded icon="mdi-check-outline" color="green" @click="acceptOrder(call_order.id)"></v-btn>
        <v-btn rounded icon="mdi-close-outline" color="red"></v-btn>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "CallOrder",
  data() {
    return {
      call_orders: [],
    };
  },
  methods: {
    getCalls() {
      this.$axios
        .get(`${this.$HOST}/v1/users/clients/get_orders_call`)
        .then((response) => {
          this.call_orders = response.data.order_calls;
          if (this.call_orders.length > 0) {
            var data = {
              soundurl: require('@/assets/alarm.wav'),
            };
            var audio = new Audio(data.soundurl);
            audio.play();
          }
        });
    },
    acceptOrder(id){
        this.$axios.put(`${this.$HOST}/v1/users/order_relationships/accept/${id}`)
        .then(()=>{
            this.getCalls();
        })
    },
    getCallsTimer(){
        setInterval(()=>{
            this.getCalls(); 
        },30000)
    }
  },
  mounted() {
    this.getCalls();
    this.getCallsTimer();
  },
};
</script>

<style scoped>
.call {
  background: #111;
  opacity: 100%;
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 5;
  color: #fff;
}
.call_info {
  height: 50%;
}
.infos {
  display: grid;
  justify-content: center;
  margin: auto;
  text-align: center;
}
.info_list {
  border: 1px solid rgba(221, 221, 221, 0.416);
  width: 300px;
  padding: 10px;
  border-radius: 12px;
}
.infos_confirmation {
  height: 40px;
  top: 20%;
  width: 40px;
  border-radius: 50%;
  position: absolute;
  animation: scaling 2s linear infinite;
}
.infos_confirmation1 {
  height: 40px;
  width: 40px;
  top: 20%;
  border-radius: 50%;
  position: absolute;
  animation: scaling 2s linear infinite;
  animation-delay: 1s;
}

@keyframes scaling {
  0% {
    transform: scale(4);
    background-color: rgb(136, 239, 148);
  }
  100% {
    transform: scale(10);
    background-color: rgba(245, 0, 182, 0);
  }
}
</style>