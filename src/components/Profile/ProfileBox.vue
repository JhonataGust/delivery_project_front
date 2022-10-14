<template>
  <div class="main">
    <div class="profile_main">
      <div class="profile">
        <div class="profile_img">
          <label for="img">
            <v-avatar color="white" style="width: 100%; height: 120px">
              <v-img
              v-if="!user.avatar == ''"
              cover
              :src="user.avatar"
              >
              <v-btn
              icon="mdi-close-outline"
              color="#111"
              size="20"
              @click="deleteAvatar"
              style="position:absolute;right: 10px;bottom:5px;right: 10px;"
              >
            </v-btn>
              </v-img>
              <span
              v-else 
              class="white--text text-h3"
              >{{user.short_name}}
            </span>
            </v-avatar>
          </label>
        </div>
        <div class="preview_img">
          <form>
            <input
              type="file"
              id="img"
              style="visibility: hidden"
              @change="onFile"
            />
            <div class="preview_infos" v-if="imgSrc">
                <h3 style="text-align:center">Preview</h3>
              <img :src="imgSrc" v-if="imgSrc" />
              <v-btn
                v-if="imgSrc"
                rounded
                @click="updateAvatar"
                style="width: 100%; color: aliceblue"
                color="#E65F5C"
              >
                Salvar
              </v-btn>
            </div>
          </form>
        </div>
        <div class="user_infos">
          <h3>{{user.full_name}}</h3>
          <div class="divider_title">
            <h4 style="color: #e65f5c">Endereços Adicionados</h4>
            <v-divider inset></v-divider>
          </div>
          <div class="address_infos" v-for="address in user.address" :key="address.id">
            <h5>Bairro: {{address.district}}</h5>
            <h5>Rua: {{address.street}}, {{address.number}}</h5>
            <h5>Cidade: {{address.city}}</h5>
          </div>
          <div class="account_level">
            <v-progress-circular
              :rotate="360"
              :size="100"
              :width="15"
              :model-value="level_account"
              color="teal"
            >
              50pts
            </v-progress-circular>
            <h4>Nivel Novato</h4>
          </div>
          <div class="divider_title">
            <h4 style="color: #e65f5c">Historico de compras</h4>
            <v-divider inset></v-divider>
          </div>
          <div class="address_infos" v-for="n in 5" :key="n">
            <h4 class="paid">Pago</h4>
            <h5>Produto: Lasanha de frango</h5>
            <h5>Endereço: São do Momy, 44</h5>
            <h5>Quantidade: 10x</h5>
            <h5>Valor Total: 25R$</h5>
          </div>
          <v-btn width="100%" height="20">+</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileBox",
  data() {
    return {
      level_account: 50,
      n: 0,
      imgSrc: "",
      file_input:[],
      user:{},
      saved: false
    };
  },
  methods: {
    getUser(){
      this.$axios.get(`${this.$HOST}/v1/users/profile`)
      .catch((e)=> {
        console.log(e)
      })
      .then((response) => {
        this.user = response.data.user
      })
    },
    onFile(e) {
      const files = e.target.files;
      this.file_input = files;
      if (!files.length) return;

      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => (this.imgSrc = reader.result);
    },
    deleteAvatar(){
      this.$axios.put(`${this.$HOST}/v1/users`,{
        user: {
          avatar: ''
        }
      })
      .then(()=> {
        this.getUser();
        this.$moshaToast('Avatar atualizado!',
            {
                position: 'top-center',
                type: 'success',
                timeout: 1500,
            })
      })
    },
    updateAvatar(e) {
      e.preventDefault();

      let formData = new FormData();

      formData.append('user[avatar]', this.file_input[0])
      this.$axios.put(`${this.$HOST}/v1/users`, formData)
      .catch(()=> {
        this.$moshaToast('Ops, ocorreu um error',
            {
                position: 'top-center',
                type: 'error',
                timeout: 1500,
            })
      })
      .then(() => {
        this.imgSrc = "";
        this.getUser();
        this.$moshaToast('Avatar atualizado!',
            {
                position: 'top-center',
                type: 'success',
                timeout: 1500,
            })
      })
    },
  },
  mounted() {
    this.getUser();
  }
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
.address_infos {
  padding: 20px;
  width: 100%;
  border: 1px solid #ccc;
  margin: 10px 0px;
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