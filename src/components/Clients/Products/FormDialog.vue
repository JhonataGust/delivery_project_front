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
            @emit-payload-input="updateClientParams"
          ></input-simple>
          <v-select
            style="margin: 20px"
            label="Select"
            :items="[
              'Drinks',
              'Porções',
              'Lanches',
              'Sorvetes'
            ]"
          ></v-select>
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
          name: "company_name",
          placeholder: "Nome do Produto",
          value: "",
          readonly: false,
        },
        {
          type: "text",
          name: "short_name",
          placeholder: "Descrição do Produto",
          value: "",
          readonly: false,
        },
        {
          type: "number",
          name: "number",
          placeholder: "Valor",
          value: "",
          readonly: false,
        },
        {
          type: "number",
          name: "number",
          placeholder: "Valor Promocional",
          value: "",
          readonly: false,
        },
      ],
      client: {},
      file_input: [],
      input_values: "",
      imgSrc: "",
    };
  },
};
</script>