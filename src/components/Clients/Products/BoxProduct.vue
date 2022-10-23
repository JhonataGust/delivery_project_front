<template>
  <div class="main">
    <div class="products" v-for="i in 3" :key="i">
      <div class="product_infos">
        <div class="product_image">
          <img
            src="https://www.londrinatur.com.br/wp-content/uploads/2020/10/Lanches-Guia-gastron%C3%B4mico-Londrinatur.png"
          />
        </div>
        <div class="clear"></div>
        <div class="infos">
          <router-link to="/" style="color:unset;text-decoration:none">
          <h3 style="margin-bottom:10px">Humburguer de Siri</h3>
          <h3 style="color: #e65f5c">Oferta: 23R$</h3>
          <del style="font-size:16px">25R$</del>
        </router-link>
        </div>
        <div class="clear"></div>
        <div class="drop_expand">
          <v-expansion-panels>
            <v-expansion-panel
              title="Descrição"
              text="Extras: pererone, açai"
            ></v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>
    </div>
    <div class="products_list_type">
      <carousel :items-to-show="1.5">
    <slide v-for="slide in 4" :key="slide">
      <img 
      style="width:85px;height: 85px;"
      :src="product_types[slide - 1]['img']"
      >
      <h4>{{product_types[slide - 1]['name']}}</h4>
    </slide>

    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
    </div>
  </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
  name: "BoxProduct",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data(){
    return {
      product_types: [
        {name:"Drinks", img:require("@/assets/drink.png")},
        {name:"Porções", img:require("@/assets/portions.png")},
        {name:"Lanches", img:require("@/assets/hamburguer.png")},
        {name: "Sorvetes",img:require("@/assets/ice-cream.png")}
      ]
    }
  },
  mounted() {
  },
};
</script>

<style scoped>
.main .products {
    border: 1px #ccc solid;
    padding: 10px;
    border-radius: 12px;
    width: 100%;
    margin-bottom:25px;
} 
.product_infos .product_image{
    float: left;
    width: 20%;
}
.product_infos .product_image img{
    width: 100%;
    height: 100px;
}
.product_infos .infos{
    float: right;
    width: 60%;
    margin-right:10px;
}

@media only screen and (max-width:690px) {
  .product_infos .product_image{
    float: left;
    width: 25%;
}
}
</style>