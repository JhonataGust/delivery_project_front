<template>
  <div class="main">
    <div class="profile_main">
      <div class="profile">
        <div class="profile_img">
          <v-avatar color="white" style="width: 100%; height: 120px">
            <span class="white--text text-h3">JG</span>
          </v-avatar>
        </div>
        <div class="user_infos">
          <h3>Jhonata Gustavo</h3>
          <div class="divider_title">
            <h4 style="color: #e65f5c">Endereços Adicionados</h4>
            <v-divider inset></v-divider>
          </div>
          <div class="address_infos">
            <h5>Bairro: Pinheiros</h5>
            <h5>Rua: São do Momy, 44</h5>
          </div>
          <div class="address_infos">
            <h5>Bairro: Pinheiros</h5>
            <h5>Rua: São do Momy, 44</h5>
          </div>
          <div class="divider_title">
            <h4 style="color: #e65f5c">Nivel da Conta</h4>
            <v-divider inset></v-divider>
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
          <v-btn
          width="100%"
          height="20"
          >+</v-btn>
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
      n:0,
      imgSrc: ''
    }
  },
  methods: {
    onFile(e) {
      const files = e.target.files
      if (!files.length) return

      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = () => (this.imgSrc = reader.result)
    }
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
.paid{
    color: rgb(40, 176, 131);
}
.account_level {
  text-align: center;
  margin: 18px 0px;
}
</style>