<template>
  <div class="main">
    <div class="products" v-for="i in 3" :key="i">
      <div class="product_infos">
        <div class="product_image">
          <v-img
            src="https://www.imagensempng.com.br/wp-content/uploads/2021/06/02-25.png"
          >
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
            <h3>Humburguer de Siri</h3>
            <h3 style="color: #e65f5c">Oferta: 23R$</h3>
            <del style="font-size: 16px">25R$</del>
          </router-link>
        </div>
        <v-icon
          color="#e65f5c"
          style="position: absolute; right: 25px; cursor: pointer"
          @click="dialog = true"
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
        <v-card :loading="loading" class="mx-auto my-12" max-width="500">
          <v-progress-linear
            v-if="loading"
            class="position-absolute"
            style="z-index: 1"
            color="deep-purple"
            height="10"
            indeterminate
          ></v-progress-linear>

          <v-img
            height="250"
            src="https://www.imagensempng.com.br/wp-content/uploads/2021/06/02-25.png"
            cover
          ></v-img>

          <v-card-item>
            <v-card-title>Cafe Badilico</v-card-title>

            <v-card-subtitle>
              <span class="mr-1">Local Favorite</span>

              <v-icon
                color="error"
                icon="mdi-fire-circle"
                size="small"
              ></v-icon>
            </v-card-subtitle>
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

            <div class="my-4 text-subtitle-1">$ • Italian, Cafe</div>

            <div>
              Small plates, salads & sandwiches - an intimate setting with 12
              indoor seats plus patio seating.
            </div>
          </v-card-text>

          <v-divider class="mx-4 mb-1"></v-divider>

          <v-card-title>Ingredientes</v-card-title>

          <div class="px-4">
              <v-chip>Molho Apimentado</v-chip>
              <v-chip>Batata Palha</v-chip>
              <v-chip>Calabresa</v-chip>
              <v-chip>Requeijão</v-chip>
          </div>

          <v-card-title>Extras</v-card-title>
          <v-card-actions>
          <div class="extras_column">
              <div style="width:100%;margin-bottom: 10px;"><v-btn style="background:#e65f5c;color:aliceblue" rounded>Lasanha +</v-btn></div>
          </div>
          </v-card-actions>
          <v-card-actions>
            <v-btn color="#e65f5c" @click="reserve" text rounded class="mt-10">
              <v-icon>
                mdi-cart-outline
              </v-icon>
              Adicionar ao Carrinho
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-row justify="center">
          <v-btn icon="mdi-close-outline" style="text-align: center" @click="dialog = false">X</v-btn>
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
  data() {
    return {
      dialog: false,
      ok: "ok",
    };
  },
  mounted() {},
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