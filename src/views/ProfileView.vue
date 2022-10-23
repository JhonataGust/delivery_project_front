<template>
  <div class="spacing">
    <profile-box></profile-box>
    <!---end-loader-->
    <div class="divider_title">
      <h4 style="color: #e65f5c">Lojas</h4>
      <v-divider inset></v-divider>
    </div>
    <!---unconfirmed account_client-->
    <box-client term_list="user"></box-client>
    <!---end-unconfirmed account_client-->
    <!---init-header-edit-form-->
    <v-icon color="#E65F5C" @click="show_form = !show_form">{{
      show_form ? "mdi-minus-circle" : "mdi-plus-circle"
    }}</v-icon>
    informações pessoais
    <v-divider></v-divider>
    <form>
      <input-simple :inputs="info_inputs" v-if="show_form"></input-simple>
    </form>
    <!---end-header-edit-form-->
    <!---init-header-edit-form-->
    <v-icon color="#E65F5C" @click="show_company = !show_company">{{
      show_company ? "mdi-minus-circle" : "mdi-plus-circle"
    }}</v-icon>
    Adicionar uma empresa
    <v-divider></v-divider>
    <div v-if="show_company">
      <input-simple
        :inputs="info_inputs_company"
        v-if="show_company"
        @emit-payload-input="createClientParams"
      ></input-simple>
      <div class="spacing">
        <v-btn
          rounded
          style="width: 100%; color: aliceblue"
          color="#E65F5C"
          @click="createClient()"
        >
          Salvar
        </v-btn>
      </div>
      <p style="color: #ccc; text-align: center">
        Aviso: ao adicionar sua empresa, você estara sujeito a e-mails,
        verificação e análise para a conta ser certificada
      </p>
      <!---end-header-edit-form-->
    </div>
    <!---init-loader-->
    <v-row justify="center" v-if="loader">
      <simple-loader></simple-loader>
    </v-row>
    <div class="blank_merge"></div>
  </div>
</template>
<script>
import InputSimple from "@/components/Form/Inputs/InputSimple.vue";
import SimpleLoader from "@/components/Loader/SimpleLoader.vue";
import BoxClient from "@/components/Clients/Box/BoxClient.vue";
import ProfileBox from "@/components/Profile/ProfileBox.vue";
export default {
  components: { InputSimple, SimpleLoader, BoxClient, ProfileBox },
  name: "ProfileView",
  data() {
    return {
      user: {},
      info_inputs: [
        {
          type: "text",
          name: "name",
          placeholder: "Nome",
          value: "",
          readonly: true,
        },
        {
          type: "email",
          name: "email",
          placeholder: "E-mail",
          value: "",
          readonly: true,
        },
        {
          type: "password",
          name: "password",
          placeholder: "Senha",
          value: "undefined",
          readonly: true,
        },
      ],
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
      show_form: false,
      show_company: false,
      input_values: {},
      loader: false,
    };
  },
  methods: {
    getUser() {
      this.$axios.get(`${this.$HOST}/v1/users/profile`).then((response) => {
        this.info_inputs[0]["value"] = response.data.user.full_name;
        this.info_inputs[1]["value"] = response.data.user.email;
      });
    },
    createClientParams(values) {
      this.input_values = values;
    },
    createClient() {
      this.loader = true;
      if (this.validation(this.input_values)) {
        this.$axios
          .post(`${this.$HOST}/v1/users/clients`, {
            client: this.input_values,
          })
          .catch(() => {
            this.$moshaToast("Ops, ocorreu um error", {
              position: "top-center",
              type: "danger",
              timeout: 1500,
            });
          })
          .then(() => {
            this.show_company = false;
            this.$moshaToast("Loja criada com sucesso", {
              position: "top-center",
              type: "success",
              timeout: 1500,
            });
            this.loader = false;
          });
      }
    },
    validation(values) {
      let validated = true;
      let mapped_values = this.info_inputs_company.map((item) => {
        return item.name;
      });
      for (let i = 0; i < mapped_values.length; i++) {
        if (!mapped_values.includes(Object.keys(values)[i])) {
          validated = false;
        }
      }
      for (let i = 0; i < Object.keys(values).length; i++) {
        if (values[Object.keys(values)[i]] == "") {
          validated = false;
        }
      }
      if (!validated) {
        this.$moshaToast("Campos Vazios não Permitidos", {
          position: "top-center",
          type: "danger",
          timeout: 1500,
        });
      }
      return validated;
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>