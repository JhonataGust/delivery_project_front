<template>
  <div class="main" v-if="products.length > 0">
    <v-row justify="center" class="accepted_order">
      <div class="infos_confirmation"></div>
      <div class="infos_confirmation1"></div>
      <div class="info">
        <h4>
          {{ accepted ? "Pedidos Aceito" : "Aguardando Pedidos ser Aceito" }}
        </h4>
        <div class="icons" v-if="accepted">
          <v-icon size="50" style="width: 100%">
            mdi-sticker-check-outline
          </v-icon>
        </div>
      </div>
    </v-row>
    <div class="divider_title">
      <h4 style="color: #e65f5c">Pedidos Aceitos</h4>
      <v-divider inset></v-divider>
      <div class="list_orders">
        <div v-for="accepted_order in accepted_orders" :key="accepted_order.id">
          <div class="box_list">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-title
                  >Pedido n# {{ accepted_order.id }}</v-expansion-panel-title
                >
                <v-expansion-panel-text>
                  <div class="products_list">
                    <div
                      v-for="order_relation in accepted_order.order_relationships"
                      :key="order_relation.id"
                    >
                      <div class="box_product">
                        <h4>{{ order_relation.product_name }}</h4>
                        <h5>Informações:</h5>
                        <h5>
                          Total:
                          <b style="color: rgb(40, 176, 131)"
                            >R$ {{ order_relation.value }}</b
                          >
                        </h5>
                        <h5>
                          Metodo de pagamento:
                          <b style="color: rgb(40, 176, 131)"> PIX </b>
                        </h5>
                        <h5>
                          Status:
                          <b
                            :class="[
                              order_relation.status == 0 ? 'warning' : 'done',
                            ]"
                            >{{ order_relation.status_name }}</b
                          >
                        </h5>
                        <v-timeline side="end" align="start">
                    <v-timeline-item dot-color="pink" size="small" v-if="order_relation.status == 4">
                      <div class="d-flex">
                        <strong class="mr-4"></strong>
                        <div>
                          <strong>Entregue</strong>
                          <div class="text-caption">O pedido foi entregue</div>
                        </div>
                      </div>
                    </v-timeline-item>

                    <v-timeline-item dot-color="green" size="small" v-if="order_relation.status >= 3">
                      <div class="d-flex">
                        <strong class="mr-4"></strong>
                        <div>
                          <strong>Pedido Esta a Camminho</strong>
                          <div class="text-caption">O pedido esta a caminho da sua residencia</div>
                        </div>
                      </div>
                    </v-timeline-item>

                    <v-timeline-item dot-color="yellow" size="small" v-if="order_relation.status >= 2" >
                      <div class="d-flex">
                        <strong class="mr-4"></strong>
                        <div>
                          <strong>Pedido Pronto</strong>
                          <div class="text-caption">O pedido já esta pronto mais ainda não foi enviado</div>
                        </div>
                      </div>
                    </v-timeline-item>

                    <v-timeline-item dot-color="teal-lighten-3" size="small">
                      <div class="d-flex">
                        <strong class="mr-4"></strong>
                        <div>
                          <strong>Pedido realizado</strong>
                          <div class="text-caption">{{accepted_order.order_created_at}}</div>
                        </div>
                      </div>
                    </v-timeline-item>
                  </v-timeline>
                      </div>
                    </div>
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </div>
      </div>
    </div>
    <div class="divider_title">
      <h4 style="color: #e65f5c">Pedidos Pendentes</h4>
      <v-divider inset></v-divider>
      <div class="list_orders">
        <div
          v-for="unaccepted_order in unaccepted_orders"
          :key="unaccepted_order.id"
        >
          <div class="box_list">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-title
                  >Pedido n# {{ unaccepted_order.id }}</v-expansion-panel-title
                >
                <v-expansion-panel-text>
                  <div class="products_list">
                    <div
                      v-for="order_relation in unaccepted_order.order_relationships"
                      :key="order_relation.id"
                    >
                      <div class="box_product">
                        <h4>{{ order_relation.product_name }}</h4>
                        <h5>Informações:</h5>
                        <h5>
                          Total:
                          <b style="color: rgb(40, 176, 131)"
                            >R$ {{ order_relation.value }}</b
                          >
                        </h5>
                        <h5>
                          Metodo de pagamento:
                          <b style="color: rgb(40, 176, 131)"> PIX </b>
                        </h5>
                        <h5>
                          Status:
                          <b
                            :class="[
                              order_relation.status == 0 ? 'warning' : 'done',
                            ]"
                            >{{ order_relation.status_name }}</b
                          >
                        </h5>
                      </div>
                    </div>
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h4 style="text-align: center; margin: 200px">Sem confirmações :(</h4>
  </div>
</template>

<script>
export default {
  name: "ConfirmationView",
  data() {
    return {
      orders: [],
      accepted: false,
      interval: null,
      accepted_orders: [],
      products: [],
      unaccepted_orders: [],
      has_product: true,
    };
  },
  methods: {
    getOrders() {
      console.log(this.products);
      if (!this.has_product) return;
      this.$axios.get(`${this.$HOST}/v1/users/orders`).then((response) => {
        if (response.data.orders.length == 0) this.has_product = false;
        this.products = response.data.orders;
        response.data.orders.forEach((element) => {
          if (element.accepted) {
            if(this.accepted_orders.map(x => x.id == element.id)[0]) this.accepted_orders = [];
            this.accepted_orders.push(element);
          } else {
            if(this.unaccepted_orders.map(x => x.id == element.id)[0]) this.unaccepted_orders = [];
            this.unaccepted_orders.push(element);
          }
        });
        if (
          this.accepted_orders.length == response.data.orders.length &&
          this.accepted_orders.length != 0
        ) {
          this.accepted = true;
          this.clearIntervalTimer();
        }
      });
    },
    setOrder() {
      this.interval = setInterval(this.getOrders, 15000);
    },
    clearIntervalTimer() {
      clearInterval(this.interval);
    },
  },
  mounted() {
    this.getOrders();
    this.setOrder();
  },
};
</script>

<style scoped>
.main {
  width: 500px;
  margin: auto;
}
.accepted_order {
  height: 500px;
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
.info {
  position: absolute;
  width: 100%;
  top: 20%;
  left: 0;
  right: 0;
  text-align: center;
}
.box_product {
  cursor: pointer;
  padding: 5px;
  border: 1px solid rgba(229, 229, 229, 0.582);
  border-radius: 12px;
}

.box_product:hover {
  background: #11111111;
}
.done {
  color: rgb(40, 176, 131);
}
.warning {
  color: rgb(241, 116, 32);
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