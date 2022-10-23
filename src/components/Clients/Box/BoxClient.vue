<template>
  <simple-loader v-if="loader"></simple-loader>
  <section class="spacing" v-if="!loader">
    <dialog-form
      v-if="client_id && show_dialog_edit_client"
      :client_id="client_id"
      @emit-dialog-show="closeDialog"
    ></dialog-form>
    <div class="card-companies" v-for="client in clients" :key="client.id">
      <v-icon
        v-if="!client.completed"
        color="#E65F5C"
        style="position: absolute"
      >
        mdi-account-clock-outline
      </v-icon>
      <v-btn
        v-if="client.completed && client.mine"
        icon="mdi-pencil"
        color="#E65F5C"
        style="position: absolute; right: 10px; color: aliceblue"
        size="25"
        @click="showEditClient(client.id)"
      ></v-btn>
      <div class="avatar">
        <img
          :src="
            !client.logo ? require('@/assets/default_image.png') : client.logo
          "
        />
      </div>
      <div class="clean_float"></div>
      <div class="infos_clients">
        <router-link :to="`/client/${client.uid}`">
        <h3 class="title">{{ client.company_name }}</h3>
        </router-link>
        <div class="details">
          <p class="close">
            Fechado <b>({{ client.open }} ás {{ client.close }})</b>
          </p>
          <v-rating
            :model-value="client.company_relevance"
            color="amber"
            dense
            half-increments
            readonly
            size="20"
          ></v-rating>
        </div>
      </div>
      <div class="clean_float"></div>
    </div>
  </section>
</template>
<style scoped>
.spacing {
  margin: auto;
  max-width: 950px;
}

.card-companies {
  position: relative;
  color: #ccc;
  border: 1px solid #ccc;
  border-radius: 12px;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
}
.card-companies .infos_clients {
  float: right;
  width: 85%;
  margin-left: 32px;
}
.card-companies .avatar {
  width: 15%;
  float: left;
}
.card-companies .avatar img {
  width: 100%;
  margin-top: 10px;
}
.open {
  color: rgb(67, 179, 141);
}
.close {
  color: rgb(179, 76, 67);
}

@media screen and (max-width: 1100px) {
  .spacing {
    margin: auto 20px;
    max-width: unset;
  }
  .card-companies {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
<script>
import DialogForm from "./Form/DialogForm.vue";
import SimpleLoader from "@/components/Loader/SimpleLoader.vue";
export default {
  name: "BoxClient",
  props: {
    term_list: String,
  },
  data() {
    return {
      clients: [],
      show_dialog_edit_client: false,
      client_id: 1,
      loader: false,
    };
  },
  methods: {
    getClients() {
      let term = this.term_list ? this.term_list : "";
      this.$axios
        .get(`${this.$HOST}/v1/users/clients?term=` + term)
        .catch(() => {
          console.log("Ops, was not possible to get the clients");
        })
        .then((response) => {
          this.clients = response.data.clients;
        });
    },
    showEditClient(id) {
      this.client_id = id;
      this.show_dialog_edit_client = true;
    },
    closeDialog(value) {
      this.show_dialog_edit_client = value;
      this.getClients();
      this.$moshaToast("Loja Atualizada com Sucesso!", {
        position: "top-center",
        type: "success",
        timeout: 1500,
      });
    },
  },
  mounted() {
    this.getClients();
  },
  watch: {
    term_list: function () {
      this.loader = true;
      setTimeout(() => {
        this.getClients();
        this.loader = false;
      }, 1500);
    },
  },
  components: { DialogForm, SimpleLoader },
};
</script>