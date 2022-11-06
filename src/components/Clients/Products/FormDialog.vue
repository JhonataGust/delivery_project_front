<template>
  <div class="main-dialog" v-if="client">
    <v-dialog
      v-model="dialog"
      persistent
      class="dialog"
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
              style="width: 100%; color: aliceblue"
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
            @emit-payload-input="createProductParams"
          ></input-simple>
          <div style="margin: 10px">
            <label for="cars">Escolha o tipo do Produto</label>
            <select name="product_type" v-model="product_type">
              <option value="1">Porções</option>
              <option value="2">Drinks</option>
              <option value="3">Lanches</option>
              <option value="4">Sorvete</option>
            </select>
          </div>
          <div class="spacing">
            <div class="extras_box">
              <input type="text" v-model="input_extras" placeholder="Extra"/>
              <input type="number" step="0.01" placeholder="Valor" v-model="extra_value_input"/>
              <v-btn
              @click="addExtra"
              rounded
              >
              +
              </v-btn>
              <div class="chips_extras" v-show="extras" v-for="extra in extras" :key="extra.name">
                <v-chip style="margin:10px 0px">{{extra.name}} R${{extra.value}}</v-chip>
              </div>
              <v-btn color="red" rounded @click="extras = []" v-if="extras.length > 0" style="margin:10px 0px">Excluir Extras</v-btn>
            </div>
            <v-btn
              rounded
              @click="createProduct"
              style="width: 100%; color: aliceblue"
              color="#E65F5C"
              class="mt-5"
            >
              Salvar
            </v-btn>
          </div>
        </form>
        <p style="color: #e65f5c; text-align: center; padding: 10px">
          Aviso: Caso o Valor Promocional esteja vazio nenhuma promoção será
          aplicada
        </p>
      </v-card>
    </v-dialog>
  </div>
</template>
  
  <script>
import InputSimple from "@/components/Form/Inputs/InputSimple.vue";

export default {
  components: { InputSimple },
  props: {
    client_id: Number,
  },
  data() {
    return {
      dialog: true,
      info_inputs_company: [
        {
          type: "text",
          name: "name",
          placeholder: "Nome do Produto",
          value: "",
          readonly: false,
        },
        {
          type: "text",
          name: "description",
          placeholder: "Descrição do Produto",
          value: "",
          readonly: false,
        },
        {
          type: "number",
          name: "value",
          placeholder: "Valor",
          value: "",
          readonly: false,
        },
        {
          type: "number",
          name: "promotion",
          placeholder: "Valor Promocional",
          value: "",
          readonly: false,
        },
      ],
      product_types: ["Porções", "Drinks", "Lanches", "Sorvete"],
      client: {},
      file_input: [],
      input_values: "",
      extras:[],
      imgSrc: "",
      product_type: "",
      input_extras:"",
      extra_value_input:null
    };
  },
  methods: {
    createProductParams(values) {
      this.input_values = values;
    },
    onFile(e) {
      const files = e.target.files;
      this.file_input = files;
      if (!files.length) return;

      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => (this.imgSrc = reader.result);
    },
    createProduct() {
      let client_id = {
        client_id: this.client_id,
      };
      let product_type = {
        product_type: this.product_type,
      };
      let input_value = this.input_values;

      let payload = { ...input_value, ...client_id, ...product_type };

      console.log(payload);
      this.$axios
        .post(`${this.$HOST}/v1/users/clients/products`, {
          product: payload,
        })
        .catch(() => {
          this.$moshaToast("Campos Vazios não são permitidos", {
            position: "top-center",
            type: "error",
            timeout: 1500,
          });
        })
        .then((response) => {
          console.log("hey");
          this.updateAvatar(response.data.product.id);
          this.updateExtras(response.data.product.id);
          this.$moshaToast("Produto criado com Sucesso!", {
            position: "top-center",
            type: "success",
            timeout: 1500,
          });
          this.$router.go();
        });
    },
    updateAvatar(product_id) {
      console.log("okk");
      let formData = new FormData();
      let delete_params = {
        product: {
          image: "",
        },
      };
      formData.append("product[image]", this.file_input[0]);
      this.$axios
        .put(
          `${this.$HOST}/v1/users/clients/products/` + product_id,
          this.file_input ? formData : delete_params
        )
        .catch(() => {})
        .then((response) => {
          this.imgSrc = response.client.logo;
          this.getUser();
        });
    },
    addExtra(){
      this.extras.push({name:this.input_extras, value: this.extra_value_input})
      this.input_extras = ""
      this.extra_value_input = ""
      console.log(this.extras)
    },
    updateExtras(product_id){
      this.$axios.post(`${this.$HOST}/v1/users/clients/extras/`,{
        extra: {
          product_id: product_id,
          extras: this.extras
        }
      })      
    }
  },
};
</script>

<style scoped>
select {
  width: 100%;
  color: #111111;
  padding: 10px;
  border: 1px solid #ccc;
  outline: none;
}
.dialog {
  margin: 20px;
}
.extras_box input {
  margin: 12px 0px;
  width: 50%;
  padding: 8px 5px;
  padding-left: 20px;
  border: 1px solid #ccc;
  border-radius: 20px;
  display: inline-block;
  outline: none;
}
input:focus {
  box-shadow: 0px 0.1px 2.2px rgba(0, 0, 0, 0.02),
    0px 0.3px 5.3px rgba(0, 0, 0, 0.028), 0px 0.6px 10px rgba(0, 0, 0, 0.035),
    0px 1.1px 17.9px rgba(0, 0, 0, 0.042), 0px 2.1px 33.4px rgba(0, 0, 0, 0.05),
    0px 5px 80px rgba(0, 0, 0, 0.07);
}
</style>
