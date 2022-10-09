<template>
    <div class="register__main">
       <v-btn
       style="width: 100%;color: #fff;"
       color="#a34e4d"
       @click="register = !register"
       >
        {{register == false ? 'Ainda não possui conta' : 'Já possui uma conta?'}}
       </v-btn>
       <StepForm @emit-params_register="register_account" page="5" v-if="register"/>
       <LoginForm  v-if="!register" @emit-login_payload="save_login"/>
       <div class="infos">
        <h1 style="text-align:center;margin:20px 0px;">Quem somos</h1>
        <div class="image">
        <v-img
        src="@/assets/florid-delivery.png"
        >
        </v-img>
    </div>
    <div class="info_text">
        <h1>O melhor App de Delivery</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget fringilla lectus, 
            lacinia tempor elit. Etiam vulputate, velit nec feugiat facilisis, neque elit consectetur dui,
             at consectetur ex dui et diam. Donec ultrices tincidunt arcu at dapibus. Morbi at enim ut nunc 
             feugiat placerat. In eleifend nunc odio, ut euismod augue blandit vel. Aliquam ac auctor mi. 
             Maecenas efficitur, turpis nec sodales malesuada, arcu quam ultricies enim, sed pharetra odio urna quis felis.
             acinia tempor elit. Etiam vulputate, velit nec feugiat facilisis, neque elit consectetur dui,
             at consectetur ex dui et diam. Donec ultrices tincidunt arcu at dapibus. Morbi at enim ut nunc 
             feugiat placerat. In eleifend nunc odio, ut euismod augue blandit vel. Aliquam ac auctor mi. 
             Maecenas efficitur, turpis nec sodales malesuada, arcu quam ultricies enim, sed pharetra odio urna quis felis</p><br/>
             <h1>Monitore os seus Pedidos</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget fringilla lectus, 
            lacinia tempor elit. Etiam vulputate, velit nec feugiat facilisis, neque elit consectetur dui,
             at consectetur ex dui et diam. Donec ultrices tincidunt arcu at dapibus. Morbi at enim ut nunc 
             feugiat placerat. In eleifend nunc odio, ut euismod augue blandit vel. Aliquam ac auctor mi. 
             Maecenas efficitur, turpis nec sodales malesuada, arcu quam ultricies enim, sed pharetra odio urna quis felis.</p>
    </div>
    </div>
    </div>
</template>

<style>
    .register__main{
        background:#E65F5C;
        height: 100% !important;
    }
    .infos {
        color: aliceblue;
    }
    .infos .image{
        position: unset;
        width: 30%;
        float: left;
    }
    .infos .image img{
        position:unset;
        width:100%;
        height: 350px;
        float: left;
    }
    .infos .info_text{
        width: 60%;
        font-size: 18px;
    }

    @media only screen and (max-width:800px) {
        .infos .image{
        position: unset;
        width: 100%;
    }

    .infos .info_text{
        padding: 50px;
        width: 100%;
    }
    }
</style>
<script>
import StepForm from '@/components/Form/StepForm.vue';
import LoginForm from '../components/Form/LoginForm.vue';
import axios from 'axios'
export default {
name:'LoginView',
components: {
    StepForm,
    LoginForm
},
    data(){
        return{
            register: false
        }
    },
    methods:{
    register_account(payload){
        this.register_save(payload)
    },
    register_save(payload){
        axios
        .post(`${this.$HOST}/v1/users`,{
           user: payload.user,
           address: payload.address
        })
        .catch(()=>{
            this.$moshaToast('Campos Vazios não Permitidos',
            {
            position: 'top-center',
            type: 'danger',
            timeout: 1500,
            })
        })
        .then((response)=>{
            console.log(response)
            if (typeof response != 'undefined'){
                sessionStorage.setItem('token_user',response.data.token)
                this.$moshaToast('Conta Criada com Sucesso!',
            {
                position: 'top-center',
                type: 'success',
                timeout: 1500,
            })
                setTimeout(()=>{
                    this.$router.go()
                },1500)
            }
        })
    },
    save_login(payload){
        axios
        .post(`${this.$HOST}/v1/users/login`,{
           user: payload
        })
        .catch(()=>{
            this.$moshaToast('Senha ou Email Incorreto',
            {
            position: 'top-center',
            type: 'danger',
            timeout: 1500,
            })
        })
        .then((response)=>{
            console.log(response)
            if (typeof response != 'undefined'){
                sessionStorage.setItem('token_user',response.data.token)
                this.$router.go();
            }
        })
    }
   },
   mounted(){
    if(sessionStorage.getItem("is_logged")){
        this.$router.push('/home');
    }
   }
}

</script>