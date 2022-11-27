<template>
  <div class="list_orders" v-if="list.length > 0">
    <div style="text-align: center; margin: 50px 0px">
      <h2>{{type_name[type_list - 1]}}</h2>
    </div>
    <div class="btn_reload" style="float:right;margin: 10px 20px;">
        <v-btn icon="mdi-reload" @click="this.$router.go()"></v-btn>
    </div>
    <div v-for="accepted_order in list" :key="accepted_order.id">
      <div class="box_list">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-title
              >Pedido n# {{ accepted_order.id }}</v-expansion-panel-title
            >
            <v-expansion-panel-text>
              <div class="products_list">
                <div class="box_product">
                  <h4>{{ accepted_order.product_name }}</h4>
                  <h5>Informações:</h5>
                  <h5>
                    Total:
                    <b style="color: rgb(40, 176, 131)"
                      >R$ {{ accepted_order.value }}</b
                    >
                  </h5>
                  <h5>
                    Metodo de pagamento:
                    <b style="color: rgb(40, 176, 131)"> PIX </b>
                  </h5>
                  <h5>
                    Status:
                    <b>
                      {{ accepted_order.status_name }}
                    </b>
                  </h5>
                  <label>Mudar status</label><br />
                  <select name="status" v-model="status" class="status_select">
                    <option value="2">Pronto</option>
                    <option value="3">Em rota de entrega</option>
                  </select>
                  <v-btn
                    v-if="status != 0"
                    @click="updateStatus(accepted_order.id)"
                    >Confirmar mudança</v-btn
                  >
                </div>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
  </div>
  <div v-else class="mt-10">
    <h3 style="text-align:center;color: #ccc;">Você não possui {{type_name[type_list - 1]}} até o momento</h3>
  </div>
</template>

<script>
export default {
  name: "TableProduct",
  props: {
    list_approved: Array,
    client_uid: String,
    type_list: Number,
  },
  data() {
    return {
      status: 0,
      save: false,
      list: this.list_approved,
      type_name: [
        'Produtos Aprovados',
        'Produtos Prontos',
        'Pedidos a Caminho'
      ]
    };
  },
  methods: {
    setTypeList() {
      this.list = []
        this.list_approved.forEach((element) => {
          if (element.status == this.type_list) this.list.push(element);
        });
    },
    updateStatus(id) {
      this.$axios
        .put(`${this.$HOST}/v1/users/clients/${this.client_uid}/orders/${id}`, {
          order_relationship: {
            status: this.status,
          },
        })
        .then(() => {
            this.status = 0
        });
    },
  },
  watch: {
    type_list: function(){
        this.setTypeList();
    }
  },
  mounted() {
    this.setTypeList()
  }
};
</script>

<style scoped>
.status_select {
  width: 30%;
  border: 1px solid #1111;
  outline: none;
  border-radius: 12px;
  padding: 6px;
}
option {
  width: 100%;
  padding: 5px;
}
</style>