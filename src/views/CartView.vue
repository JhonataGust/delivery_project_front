<template>
  <h3 style="text-align: center" class="mt-5">Carrinho</h3>
  <h2 style="text-align: center" class="mt-10" v-show="products.length <= 0">
    Parece que você não possui nada no carrinho :(
  </h2>
  <div class="main" v-if="products.length > 0">
    <div class="main_cart" v-if="products">
      <div class="items" v-for="product in products" :key="product.id">
        <div class="box">
          <div class="img">
            <v-img height="120" :src="product.product_image"> </v-img>
          </div>
          <div class="description">
            <h4>{{ product.product_name }}</h4>
            <h4>
              R$
              {{
                product.product_promotion
                  ? product.product_promotion
                  : product.product_value
              }}
            </h4>
            <div class="extras" v-if="product.extra_ids.length > 0">
              <h4>Adicionais:</h4>
              <v-chip
                v-for="extra in product.extras"
                :key="extra.id"
                color="#E65F5C"
              >
                {{ extra.name }}
              </v-chip>
            </div>
            <h4>Total: R${{ product.total_value }}</h4>
            <div class="btns_add">
              <v-btn size="30">-</v-btn>
              1
              <v-btn size="30">+</v-btn>
            </div>
          </div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="order_type mt-10" style="width: 100%">
        <v-btn
          style="width: 50%"
          @click="
            pick_up = !pick_up;
            delivery = false;
          "
          :class="[pick_up ? 'clicked' : '']"
          >Vou Buscar</v-btn
        >
        <v-btn
          style="width: 50%"
          @click="
            delivery = !delivery;
            pick_up = false;
          "
          :class="[delivery ? 'clicked' : '']"
          >Delivery</v-btn
        >
        <div class="divider_title" v-if="delivery">
          <h4 style="color: #e65f5c">Endereços Adicionados</h4>
          <v-divider inset></v-divider>
        </div>
        <v-btn style="width: 100%; height: 100px" v-if="delivery">
          <div v-for="address in user.address" :key="address.id">
            <h5>Bairro: {{ address.district }}</h5>
            <h5>Rua: {{ address.street }}, {{ address.number }}</h5>
            <h5>Cidade: {{ address.city }}</h5>
          </div>
        </v-btn>
      </div>
      <v-btn
        style="width: 100%; color: aliceblue; background: #64a64e"
        class="mt-10"
        @click="createOrder"
        >Realizar Compra</v-btn
      >
      <div class="sub_infos" style="float: right; margin-top: 28px">
        <h3 style="color: #ccc">Valor Total: R$ {{ total_value }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartView",
  data() {
    return {
      products: [],
      total_value: 0,
      delivery: false,
      pick_up: false,
      user: {},
      param_products: [],
    };
  },
  methods: {
    getCart() {
      this.$axios.get(`${this.$HOST}/v1/users/user_carts`).then((response) => {
        this.products = response.data.user_carts;
        this.getUser();
        this.totalValue();
      });
    },
    getUser() {
      this.$axios
        .get(`${this.$HOST}/v1/users/profile`)
        .catch((e) => {
          console.log(e);
        })
        .then((response) => {
          this.user = response.data.user;
        });
    },
    deleteCart() {
      this.products.forEach((element) => {
        this.$axios.delete(`${this.$HOST}/v1/users/user_carts/${element.id}`);
      });
    },
    createOrder() {
      this.$axios
        .post(`${this.$HOST}/v1/users/orders`, {
          order: {
            value: this.total_value,
            delivery: this.delivery,
            orders_relationship_attributes: this.param_products,
          },
        })
        .then(() => {
          this.deleteCart();
          this.$router.push("/confirmation");
        });
    },
    totalValue() {
      this.products.forEach((element) => {
        this.total_value += element.total_value;
        this.param_products.push({
          product_id: element.product_id,
          value: element.total_value,
          quantity: 1,
          extra_ids: element.extra_ids,
        });
      });
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>

<style scoped>
.main_cart {
  padding: 10px;
  width: 500px;
  margin: 100px auto;
}
.box .img {
  width: 20%;
  float: left;
}
.box {
  box-shadow: 0px 5px 30px -13px rgba(66, 68, 90, 1);
  padding: 10px;
}
.description {
  color: #ccc;
  float: right;
  width: 70%;
  margin-right: 10px;
}
.address_infos {
  padding: 20px;
  width: 100%;
  border: 1px solid #ccc;
  margin: 10px 0px;
}
.clicked {
  background: rgb(255, 189, 58);
}
.clear {
  clear: both;
}
</style>