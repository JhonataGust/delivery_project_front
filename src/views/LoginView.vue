<template>
   <v-toolbar class="nav-bar">
            <v-spacer></v-spacer>
            <section class="logo-img">
                <img :src="require('../assets/Logomark.png')" alt="logo-img" @click="this.$router.go()">
            </section>
            <section class="nav-middle">
                <a href="#">Entregador</a>
                <a href="#">Burguer card</a>
                 <a href="#">Carreiras</a>
                <a href="#">Sobre</a>
            </section>
            <v-app-bar-nav-icon class="bar-custom"
             variant="text"
             @click.stop="drawer = !drawer"
             style="position: absolute; left: 6em;"
             ></v-app-bar-nav-icon>
            <v-btn class="btn-top" @click="register = !register; hideForm = true;">
                {{register == false ? 'Criar conta' : 'Entrar'}}
            </v-btn>
            <v-spacer></v-spacer>
    </v-toolbar>
    <section class="nav-middle-mobile fade__right" v-if="drawer">
               <ul>
                    <li><a href="#">Entregador</a></li>
                    <li><a href="#">Burguer card</a></li>
                    <li><a href="#">Carreiras</a></li>
                    <li><a href="#">Sobre</a></li>
               </ul>
            </section>
    <div class="register__main">
      
       <StepForm @emit-params_register="register_account" page="5" v-if="register"/>
       <LoginForm  v-if="!register && hideForm" @emit-login_payload="save_login"/>
    </div>
    <v-carousel
    class="vsheet"
    v-if="hideForm==false"
    height="100vh"
    background-attachment="fixed"
    hide-delimiters
    progress="primary"
  >
    <v-carousel-item
        class="vsheet"
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet
       class="vsheet"
        height="100%"
      >
        <div class="d-flex fill-height justify-center align-center">
            <v-img
            class="img-opacity"
            :src="slide"
            center
            cover>
                <h3>
                    {{phrases[i]}}
                </h3>
            </v-img>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<style scoped>
    .nav-bar {
        position: relative;
    }

    .logo-img {
        position: absolute;
        left: 5%;
        margin-top: 5px;
    }
    .logo-img > img {
        width: 4em;
        cursor: pointer;
    }

    .nav-middle {
       position: absolute;
       left: 13%;
    }

    .nav-middle-mobile {
        display: flex;
        position: absolute;
        top: 9%;
        max-width: 50%;
        min-width: 25%;
        background: #EEEEEE;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        box-shadow: 5px 7px 8px 2px rgba(0,0,0,0.1);

    }
    

    .nav-middle-mobile a {
        width: 100%;
        padding: 20px;
        text-decoration: none; 
        
        color: var(--color-prime);
        font-size: 1em;
    }

    ul > li {
        margin: 20px 0px;
    }

    .nav-middle-mobile a:hover {
        opacity: 90%;
        color: rgb(147, 147, 147);
        transition-duration: .5s;
    }

    .nav-middle a{
        margin: auto;
        padding: 20px;
        text-decoration: none;
        color: var(--color-prime);    
    }

    .nav-middle a:hover {
        opacity: 90%;
        color: rgb(147, 147, 147);
        transition-duration: .5s;
    }

    .btn-top {
        position: absolute;
        right: 5%;
        border-radius: 10px;
        background-color: var(--color-prime);
        color: white;
    }
    .btn-top:hover {
        transform: translateY(-1.5px);
        transition-duration: .4s;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.455);
    }

    .btn-top:active {
        opacity: 75%;
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
    .bar-custom {
        display: none;
    }

    .img-opacity { 
        opacity: 90%;
    }
     
    h3 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font: bold 4em 'Arial';
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.581);
        color: white;
    }

    @media only screen and (max-width:690px) {
        .infos .image{
        position: unset;
        width: 100%;
    }

    .infos .info_text{
        padding: 50px;
        width: 100%;
    }
    .nav-middle {
        display: none;
    }

    .bar-custom {
        display: block;
    }
   
    }


    .vsheet {
        background-attachment: fixed;
    }

    @media only screen and (max-width:1280px) {
        .img-opacity {
            height: 100vh;
            background-size: cover;

        }

        h3 {
            font: bold 3em 'Arial';
        }
    }

    @media only screen and (max-width:965px) {
        .img-opacity {
            height: 100vh;
            background-size: cover;
    
        }

        h3 {
            font: bold 2.5em 'Arial';
        }
    }

    @media only screen and (max-width:805px) {
        .img-opacity {
            height: 100vh;
            background-size: cover;
        }

        h3 {
            font: bold 2em 'Arial';
        }
    }

    
    @media only screen and (max-width:700px) {
        .img-opacity {
            height: 100vh;
            background-size: cover;
        }

        h3 {
            font: bold 1.5em 'Arial';
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
            register: false,
            hideForm: false,
            drawer: false,
            slides: [
                "https://images.pexels.com/photos/3738755/pexels-photo-3738755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/13457624/pexels-photo-13457624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/4869423/pexels-photo-4869423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            ],
            phrases: [
                "The best food delivery",
                "The best in the world",
                "The best cook"
            ]
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