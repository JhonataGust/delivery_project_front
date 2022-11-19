<template>
  <div class="main spacing" v-if="client">
    <div class="add_product">
      <v-btn
      style="color:#E65F5C"
      @click="dialog = true"
      v-if="client.mine"
      >
        Add +
      </v-btn>

      <router-link :to="`/client_manage/${uid}`" style="text-decoration:none">
      <v-btn
      style="color:#ccc"
      >
        Gerenciar Loja
      </v-btn>
    </router-link>
    </div>
    <div class="profile_main">
      <div class="profile">
        <div class="profile_img">
          <label for="img">
            <v-avatar color="white" style="width: 100%; height: 120px">
              <v-img :src="client.logo"> </v-img>
            </v-avatar>
          </label>
        </div>
        <div class="user_infos">
          <h3>{{ client.company_name }}</h3>
        </div>
                <v-card>
          <v-tabs v-model="tab" style="color:#E65F5C">
            <v-tab value="one">Produtos</v-tab>
            <v-tab value="two">Localização</v-tab>
            <v-tab value="three">Promoções</v-tab>
            <v-tab value="three">Comentarios</v-tab>
          </v-tabs>
          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="one"><box-product :uid="uid"></box-product></v-window-item>

              <v-window-item value="two"> Two </v-window-item>

              <v-window-item value="three"> Three </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
  <form-dialog v-if="dialog" :client_id="client.id"></form-dialog>
</template>

<script>
import BoxProduct from '@/components/Clients/Products/BoxProduct.vue';
import FormDialog from '@/components/Clients/Products/FormDialog.vue';
export default {
  components: { BoxProduct, FormDialog },
  name: "ClientView",
  props: {
    uid: String,
  },
  data() {
    return {
      name: "ola",
      client: null,
      dialog: false,
      tab: null,
    };
  },
  methods: {
    getClient() {
      this.$axios
        .get(`${this.$HOST}/v1/users/clients/${this.uid}`)
        .then((response) => {
          this.client = response.data.client;
        });
    },
  },
  mounted() {
    this.getClient();
  },
};
</script>

<style scoped>
.profile_main {
  margin: 50px 0px;
}
.user_infos h3 {
  text-align: center;
}
.profile_img {
  background: #e65f5c;
  border-radius: 50%;
  max-width: 125px;
  margin: auto;
}
.paid {
  color: rgb(40, 176, 131);
}
.account_level {
  text-align: center;
  margin: 18px 0px;
}

.preview_img {
  max-width: 250px;
  min-width: 250px;
  margin: auto;
}
.preview_img img {
  width: 100%;
  border-radius: 50%;
  min-height: 250px;
  max-height: 250px;
}
</style>