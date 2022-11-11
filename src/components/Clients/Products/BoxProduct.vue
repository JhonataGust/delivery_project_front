<template>
  <div class="main">
    <div class="products" v-for="product in products" :key="product.id">
      <div class="product_infos">
        <div class="product_image">
          <v-img :src="product.image">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </div>
        <div class="clear"></div>
        <div class="infos">
          <router-link to="/" style="color: unset; text-decoration: none">
            <h3>{{ product.name }}</h3>
            <div v-if="product.promotion != 0">
              <h3 style="color: #e65f5c">Por: {{ product.promotion }}R$</h3>
              <h4>
                De: <del style="font-size: 16px">{{ product.value }}R$</del>
              </h4>
            </div>
            <div v-else>
              <h3 style="color: #e65f5c">Preço: {{ product.value }}R$</h3>
            </div>
          </router-link>
        </div>
        <v-icon
          color="#e65f5c"
          style="position: absolute; right: 25px; cursor: pointer"
          @click="getProduct(product.id)"
        >
          mdi-information-outline
        </v-icon>
        <div class="clear"></div>
      </div>
    </div>
    <div class="products_list_type">
      <list-products></list-products>
    </div>
    <!---Overlay-Dialog-->
    <div class="text-center">
      <v-dialog v-model="dialog" activator="parent">
        <v-card :loading="loading" class="mx-auto my-12" max-width="650">
          <v-progress-linear
            v-if="loading"
            class="position-absolute"
            style="z-index: 1"
            color="deep-purple"
            height="10"
            indeterminate
          ></v-progress-linear>
          <v-card-item>
            <v-card-title>{{ product_show.product_type }}</v-card-title>
          </v-card-item>
          <v-img height="250" :src="product_show.image" cover></v-img>

          <v-card-item>
            <v-card-title>{{ product_show.name }}</v-card-title>
          </v-card-item>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :model-value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="text-grey ms-4">4.5 (413)</div>
            </v-row>

            <div class="my-4 text-subtitle-1">Recomendamos esse Produto!</div>

            <div>
              {{ product_show.description }}
            </div>
          </v-card-text>

          <v-divider class="mx-4 mb-1"></v-divider>
          <v-card-title>Extras</v-card-title>
          <v-card-actions>
            <div
              class="extras_column"
              v-for="extra in product_show.extras"
              :key="extra.id"
            >
              <div style="width: 100%; margin-bottom: 10px">
                <v-btn
                  style="background: #e65f5c; color: aliceblue"
                  rounded
                  :class="[extras.includes(extra.id) ? 'glow_btn' : '']"
                  @click="addExtras(extra.id, extra.price)"
                  >{{ extra.name }} - R${{ extra.price }}</v-btn
                >
              </div>
            </div>
          </v-card-actions>
          <v-card-text v-if="extras.length == 0"><h4>Nenhum extra Adicionado</h4></v-card-text>
          <v-card-text
            >Valor Total: R${{total_value}}</v-card-text
          >
          <v-card-actions>
            <v-btn color="#e65f5c" @click="addToCart(product_show.id)" text rounded class="mt-10">
              <v-icon> mdi-cart-outline </v-icon>
              Adicionar ao Carrinho
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-row justify="center">
          <v-btn
            icon="mdi-close-outline"
            style="text-align: center"
            @click="dialog = false"
            >X</v-btn
          >
        </v-row>
      </v-dialog>
    </div>
    <!-----End-OverLay-->
  </div>
</template>

<script>
import ListProducts from "./ListProducts.vue";
export default {
  components: { ListProducts },
  name: "BoxProduct",
  props: {
    uid: String,
  },
  data() {
    return {
      dialog: false,
      ok: "ok",
      products: {},
      loading: false,
      product_show: {},
      extras: [],
      total_value: 0
    };
  },
  methods: {
    getProducts() {
      this.$axios
        .get(`${this.$HOST}/v1/users/clients/${this.uid}/products`)
        .then((response) => {
          this.products = response.data.products;
        });
    },
    getProduct(product_id) {
      this.$axios
        .get(`${this.$HOST}/v1/users/clients/products/${product_id}`)
        .then((response) => {
          this.product_show = response.data.product
          this.total_value = response.data.product.promotion ? response.data.product.promotion : response.data.product.value
          this.extras = []
          this.dialog = true
        });
    },
    addExtras(extra_id, extra_value) {
      if (this.extras.includes(extra_id)) {
        this.remove(this.extras, extra_id);
        this.total_value -= extra_value;
        return false;
      }
      this.extras.push(extra_id);
      this.total_value += extra_value
    },
    remove(arr, string) {
      var found = arr.indexOf(string);

      while (found !== -1) {
        arr.splice(found, 1);
        found = arr.indexOf(string);
      }
    },
    addToCart(product_id){
      this.$axios
        .post(`${this.$HOST}/v1/users/user_carts`,{
          user_cart: {
            product_id: product_id,
            extra_ids: this.extras
          }
        })
        .then(() => {
          this.$moshaToast("Produto Adicionado no carrinho!", {
            position: "top-center",
            type: "success",
            timeout: 1500,
          });
        });
    }
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<style scoped>
.main .products {
  padding: 10px;
  border-radius: 12px;
  width: 100%;
  margin-bottom: 12px;
}
.product_infos {
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.3);
  display: flex;
  padding: 18px;
  position: relative;
}
.glow_btn {
  background: rgb(71, 181, 236) !important;
}
.product_infos .product_image {
  width: 20%;
}
.product_infos .product_image img {
  width: 100%;
  height: 100px;
}
.product_infos .infos {
  width: 60%;
  margin-right: 10px;
}

@media only screen and (max-width: 690px) {
  .product_infos .product_image {
    float: left;
    width: 25%;
  }
}
</style>