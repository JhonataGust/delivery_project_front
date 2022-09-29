<template>    
    <v-row justify="center" class="mx-auto" style="background:#E65F5C">
<div class="header__div fade__right" v-if="step == 1">
    <div class="pernosal_infos">
    <div class="title">
        <h2>Antes de continuar precisamos de algumas informações</h2>
    </div>
    <div class="current_image d-flex flex-column align-center">
        <v-img
        style="left: 0;right: 50%;"
        width="300"
        height="300"
        src="../../assets/motocycle_animation.gif"
        ></v-img>
    </div>
    <div class="steps__names">
        <h3>informações Pessoais</h3>
    </div>
    <div class="form" style="margin:0px 120px;padding: 50px">
        <label>Nome Completo</label>
        <input type="text" placeholder="Ex: João Carlos"/><br/>
        <label>Email</label>
        <input type="text" placeholder="Ex: João Carlos"/><br/>
        <label>Numero do Celular</label>
        <input type="text" placeholder="Ex: João Carlos"/><br/>
        <label>Crie sua Senha</label>
        <input type="text" placeholder="Ex: João Carlos"/><br/>
        <label>Confirme sua Senha</label>
        <input type="text" placeholder="Ex: João Carlos"/><br/>
        <v-btn
        style="width:100%;color:aliceblue"
        color="#E65F5C"
        @click="step++"
        >
            Proximo
        </v-btn>
    </div>
</div>
</div>
<div class="header__div fade__right" v-if="step == 2">
    <div class="pernosal_infos">
    <div class="current_image d-flex flex-column align-center">
        <v-img
        style="left: 0;right: 50%;"
        width="300"
        height="300"
        src="../../assets/motocycle_animation.gif"
        ></v-img>
    </div>
    <div class="steps__names">
        <h3>Sobre você</h3>
    </div>
    <div class="form" style="margin:0px 0px !important;padding: 50px">
        <label>Sua cidade:</label>
        <v-combobox
          @click="getCities"
          v-model="city_result"
          :items="cities"
          max-height="150"
          label="Selecione sua cidade"
          outlined
          dense
        ></v-combobox>
        <label>Rua</label>
        <input type="text" placeholder="Ex: Rua São Carlos"/><br/>
        <label>Bairro</label>
        <input type="text" placeholder="Ex: Villa Almeida"/><br/>
        <label>Numero da Residencia</label>
        <input type="number" placeholder="Ex: 198"/><br/>
        <v-btn
        style="width:100%;color:aliceblue"
        color="#E65F5C"
        >
            Concluir
        </v-btn>
    </div>
</div>
</div>
</v-row>
</template>
<style scoped>
.header__div{
    margin: 50px;
    border-radius: 15px;
    padding: 30px;
    background: #fff;
    box-shadow:
  0px 2.8px 2.2px rgba(0, 0, 0, 0.006),
  0px 6.7px 5.3px rgba(0, 0, 0, 0.008),
  0px 12.5px 10px rgba(0, 0, 0, 0.01),
  0px 22.3px 17.9px rgba(0, 0, 0, 0.012),
  0px 41.8px 33.4px rgba(0, 0, 0, 0.014),
  0px 100px 80px rgba(0, 0, 0, 0.02)
;
}    
.header__div .title{
    text-align: center;
}
.steps__names{
    text-align: center;
}
.form input{
    margin: 12px 0px;
    width: 100%;
    padding: 8px 5px;
    padding-left: 20px;
    border: 1px solid #ccc;
    border-radius: 20px;
    display: inline-block;
    outline: none;
}   

.form input:focus{
    box-shadow:
  0px 0.1px 2.2px rgba(0, 0, 0, 0.02),
  0px 0.3px 5.3px rgba(0, 0, 0, 0.028),
  0px 0.6px 10px rgba(0, 0, 0, 0.035),
  0px 1.1px 17.9px rgba(0, 0, 0, 0.042),
  0px 2.1px 33.4px rgba(0, 0, 0, 0.05),
  0px 5px 80px rgba(0, 0, 0, 0.07)
;
}
@media only screen and (max-width:800px) {
    .header__div{
        width: 100%;
        padding:15px !important;
    }¨
    .form input {
    margin: unset;
    padding:unset;
    padding-left: 20px;
    outline: none;
    }

    .form{
        margin: unset !important;
        width: 100%;
        padding: 12px !important;
    }

}
</style>
<script>
export default {
    name: 'StepForm',
    props:{
        page: String
    },
    data(){
        return {
            step: 1,
            cities: [],
            states: [],
            city_result: '',
            full_name: '',
            email:'',
            phone:'',
            password:'',
            confirm_password:''
        }
    },
    methods:{
        sendParams(){
            this.$emit("emit-result",50)
        },
        getCities(term){
            this.$axios.get(`${this.$HOST}/v1/cities?term=${term}`).then((response) => {
                this.cities = response.data.cities.map((value) => value['name'])
                console.log(this.cities)
            })
        }
    },
    watch: {
        city_result: function(value){
            this.getCities(value)
        }
    }
}
</script>