<template>    
    <v-row justify="center" class="mx-auto">
<div class="header__div fade__right">
    <div class="pernosal_infos">
    <div class="form">
        <label>E-mail</label>
        <input type="email" v-model="email" placeholder="Seu e-mail"/><br/>
        <label>Senha</label>
        <input type="password" placeholder="Sua Senha" v-model="password"/><br/>
        <v-btn
        style="width:100%;color:aliceblue"
        color="#E65F5C"
        @click="sendParams()"
        >
            Entrar
        </v-btn>
    </div>
</div>
</div>
</v-row>
</template>
<style scoped>
.header__div{
    margin-top: 150px;
    width: 30%;
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

.form{
        background: #fff;
        box-shadow:
        0px 2.8px 2.2px rgba(0, 0, 0, 0.006),
        0px 6.7px 5.3px rgba(0, 0, 0, 0.008),
        0px 12.5px 10px rgba(0, 0, 0, 0.01),
        0px 22.3px 17.9px rgba(0, 0, 0, 0.012),
        0px 41.8px 33.4px rgba(0, 0, 0, 0.014),
        0px 100px 80px rgba(0, 0, 0, 0.02)
        ;
        border-radius: 15px;
        padding: 30px;
        margin: 110px 0px !important;
        width: 100%;
    }
@media only screen and (max-width:800px) {
    .header__div{
        margin-top: 0px;
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
        background: #fff;
        box-shadow:
  0px 2.8px 2.2px rgba(0, 0, 0, 0.006),
  0px 6.7px 5.3px rgba(0, 0, 0, 0.008),
  0px 12.5px 10px rgba(0, 0, 0, 0.01),
  0px 22.3px 17.9px rgba(0, 0, 0, 0.012),
  0px 41.8px 33.4px rgba(0, 0, 0, 0.014),
  0px 100px 80px rgba(0, 0, 0, 0.02)
;
border-radius: 15px;
    padding: 30px;
        margin: 150px 0px !important;
        width: 100%;
        padding: 30px !important;
    }

}
</style>
<script>
export default {
    name: 'LoginForm',
    data(){
        return {
            email: '',
            password:''
        }
    },
    methods: {
        sendParams(){
            let payload = {
                email: this.email,
                password: this.password
            }
            this.$emit("emit-login_payload",payload)
        }
    }
}
</script>