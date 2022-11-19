<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title>Comentarios</v-expansion-panel-title>
      <v-expansion-panel-text>
        <div v-if="show_input">
          <v-textarea
            variant="solo"
            v-model="comment"
            label="Edite seu comentario"
            auto-grow
            rows="1"
          ></v-textarea>
          <v-rating
            :model-value="rate"
            color="amber"
            dense
            half-increments
            readonly
            size="28"
          ></v-rating>
          <p style="color: #ccc">Não é possivel editar a nota</p>
          <v-btn @click="updateMessage(current_id)">Editar Comentario</v-btn>
        </div>
        <div class="message" v-if="!show_input">
          <v-textarea
            variant="solo"
            v-model="comment"
            label="Digite seu comentario"
            auto-grow
            rows="1"
          ></v-textarea>
          <div v-if="comment.length > 0">
            <div v-if="rate == 0">
              <v-icon v-for="i in 5" :key="i" color="amber" @click="rate = i"
                >mdi-star-outline</v-icon
              >
            </div>
            <div v-else>
              <div
                class="reset_rating"
                @click="rate = 0"
                style="cursor: pointer"
              >
                <v-rating
                  :model-value="rate"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="28"
                ></v-rating>
              </div>
              <v-btn @click="createMessage">Enviar Comentario</v-btn>
            </div>
          </div>
          <v-card
            class="mx-auto mt-10"
            v-for="message in messages_raw"
            :key="message.id"
            style="position: relative"
          >
            <div
              style="
                position: absolute;
                top: 10px;
                right: 20px;
                cursor: pointer;
              "
              @click="editComment(message.message, message.rate, message.id)"
            >
              <v-icon size="15" color="#ccc">mdi-pencil</v-icon>
            </div>

            <v-card-text>
              <b>{{ message.user_name }}</b> <br />
              {{ message.message }}<br />
              <p style="color: #ccc">{{ message.edited  == true ? "Editado" : "" }}</p>
              <v-rating
                :model-value="message.rate"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>
            </v-card-text>
          </v-card>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "CommentsBox",
  props: {
    product_id: Number,
    messages: Array,
  },
  data() {
    return {
      comments: [],
      rate: 0,
      comment: "",
      show_input: false,
      messages_raw: this.messages,
      current_id: null,
    };
  },
  methods: {
    getMessages() {
      this.$axios
        .get(`${this.$HOST}/v1/users/clients/products/${this.product_id}`)
        .then((response) => {
          this.comment = "";
          this.rate = 0;
          this.messages_raw = response.data.product.messages;
        });
    },
    createMessage() {
      this.$axios
        .post(`${this.$HOST}/v1/users/messages`, {
          message: {
            message: this.comment,
            reference_type: "Product",
            reference_id: this.product_id,
            rate: this.rate,
          },
        })
        .then(() => {
          this.getMessages();
        });
    },
    editComment(message, rate, id) {
      this.current_id = id;
      this.show_input = true;
      this.rate = rate;
      this.comment = message;
    },
    updateMessage(id) {
      this.$axios
        .put(`${this.$HOST}/v1/users/messages/${id}`, {
          message: {
            message: this.comment,
            rate: this.rate,
          },
        })
        .then(() => {
          this.show_input = false;
          this.getMessages();
        });
    },
  },
};
</script>

<style scoped>
.icon_star {
  cursor: pointer;
}
</style>