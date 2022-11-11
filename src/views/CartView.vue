<template>
  <div class="main" v-if="products.length > 0">
    <h3 style="text-align: center" class="mt-5">Carrinho</h3>
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
            <div class="extras" v-if="product.extras.length > 0">
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
      <div class="order_type mt-10" style="width:100%">
        <v-btn style="width:50%">Vou Buscar</v-btn>
        <v-btn style="width:50%">Delivery</v-btn>
      </div>
      <v-btn style="width: 100%; color: aliceblue; background: #64a64e" class="mt-10"
        >Realizar Compra</v-btn
      >
      <div class="sub_infos" style="float:right;margin-top: 28px;">
        <h3 style="color:#ccc">Valor Total: R$ {{total_value}}</h3>
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
      total_value: 0
    };
  },
  methods: {
    getCart() {
      this.$axios.get(`${this.$HOST}/v1/users/user_carts`).then((response) => {
        this.products = response.data.user_carts;
        this.totalValue();
      });
    },
    createOrder(){
      this.$axios.post(`${this.$HOST}/v1/users/orders`,{
        order:{
          value: ''
        }
      }).then((response) => {
        this.products = response.data.user_carts;
      });
    },
    totalValue(){
      this.products.forEach((element) => {
      this.total_value += element.total_value
      });
    }
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
.clear {
  clear: both;
}
</style>