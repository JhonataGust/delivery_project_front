<template>
  <div class="main-dialog" v-if="client">
    <v-dialog
      v-model="dialog"
      persistent
      style="max-width: 600px; margin: auto"
    >
      <v-card>
        <v-card-text>
          <h3>Editar Loja</h3>
        </v-card-text>
        <div class="divider_title">
          <h4 style="color: #e65f5c">Faça o Upload da Foto ou Logo</h4>
          <v-divider inset></v-divider>
        </div>
        <v-row justify="center" style="padding: 50px">
          <label for="file" style="width: 100%">
            <v-img
              size="120px"
              rounded
              cover
              :src="imgSrc ? imgSrc : require('@/assets/default_image.png')"
            >
            </v-img>
          </label>
          <div class="mt-10">
          <v-btn
            v-if="imgSrc"
            rounded
            @click="
              imgSrc = '';
              file_input = '';
            "
            style="width: 100%; color: aliceblue;"
            color="#E65F5C"
          >
            Excluir
          </v-btn>
          </div>
        </v-row>
        <form>
          <input
            id="file"
            type="file"
            style="visibility: hidden"
            @change="onFile"
          />
        </form>
        <div class="divider_title">
          <h4 style="color: #e65f5c">Editar informações</h4>
          <v-divider inset></v-divider>
        </div>
        <form>
          <input-simple
            :inputs="info_inputs_company"
            v-if="client"
            @emit-payload-input="updateClientParams"
          ></input-simple>
          <div class="spacing">
            <v-btn
              rounded
              @click="SaveUpdates"
              style="width: 100%; color: aliceblue"
              color="#E65F5C"
            >
              Salvar
            </v-btn>
          </div>
        </form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import InputSimple from "@/components/Form/Inputs/InputSimple.vue";

export default {
  components: { InputSimple },
  props: {
        client_id: Number
      },
  data() {
    return {
      dialog: true,
      info_inputs_company: [
        {
          type: "text",
          name: "company_name",
          placeholder: "Nome da Empresa",
          value: "",
          readonly: false,
        },
        {
          type: "text",
          name: "short_name",
          placeholder: "Sigla",
          value: "",
          readonly: false,
        },
        {
          type: "email",
          name: "email",
          placeholder: "E-mail",
          value: "",
          readonly: false,
        },
        {
          type: "number",
          name: "number",
          placeholder: "Numero para contato",
          value: "",
          readonly: false,
        },
        {
          type: "time",
          name: "open",
          placeholder: "Abre as:",
          value: "18h",
          readonly: false,
        },
        {
          type: "time",
          name: "close",
          placeholder: "Fecha as:",
          value: "21h",
          readonly: false,
        },
      ],
      client: {},
      file_input: [],
      input_values: "",
      imgSrc: "",
    };
  },
  methods: {
    onFile(e) {
      const files = e.target.files;
      this.file_input = files;
      if (!files.length) return;

      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => (this.imgSrc = reader.result);
    },
    getClients() {
      this.$axios
        .get(`${this.$HOST}/v1/users/clients/` + this.client_id)
        .catch(() => {
          console.log("Ops, was not possible to get the clients");
          return
        })
        .then((response) => {
          this.client = response.data.client;
          this.imgSrc = response.data.client.logo;
          console.log(response.data.client);
          this.info_inputs_company[0]["value"] = response.data.client.company_name
          this.info_inputs_company[1]["value"] = response.data.client.short_name 
          this.info_inputs_company[2]["value"] = response.data.client.email 
          this.info_inputs_company[3]["value"] = response.data.client.number 
          this.info_inputs_company[4]["value"] = response.data.client.open  
          this.info_inputs_company[5]["value"] = response.data.client.close 
        });
    },
    SaveUpdates(e){
      e.preventDefault();
      this.updateAvatar();
      if (this.file_input) this.updateClient();
      this.$emit('emit-dialog-show',false)
    },
    updateAvatar() {
      let formData = new FormData();
      let delete_params = {
        client: {
          logo: ''
        }
      }
      formData.append("client[logo]", this.file_input[0]);
      this.$axios
        .put(`${this.$HOST}/v1/users/clients/` + this.client_id, this.file_input ? formData : delete_params)
        .catch(() => {
        })
        .then((response) => {
          this.imgSrc = response.client.logo;
          this.getUser();
        });
    },
    updateClientParams(values){
      this.input_values = values;
    },
    updateClient(){
      this.$axios
          .put(`${this.$HOST}/v1/users/clients/` + this.client_id, {
            client: this.input_values,
          })
          .catch(() => {
          })
    }
  },
  mounted() {
    this.getClients();
  }
};
</script>

<style scoped>
.main-dialog {
  width: 500px;
  max-width: 500px;
  z-index: -1;
}
</style>