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
      
    </div>
  </div>
</template>

<script>
export default {
  name: "BoxProduct",
  mounted() {
    console.log("olaa");
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