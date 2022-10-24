<template>
<carousel :items-to-show="1.5">
        <slide v-for="slide in 4" :key="slide">
          <img
            style="width: 85px; height: 85px"
            :src="product_types[slide - 1]['img']"
          />
          <h4>{{ product_types[slide - 1]["name"] }}</h4>
        </slide>
        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
export default {
  name: "ListProducts",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      product_types: [
        { name: "Drinks", img: require("@/assets/drink.png") },
        { name: "Porções", img: require("@/assets/portions.png") },
        { name: "Lanches", img: require("@/assets/hamburguer.png") },
        { name: "Sorvetes", img: require("@/assets/ice-cream.png") },
      ],
    };
  },
};
</script>