<template>
  <v-app>
    <v-main>
      <router-view/>
      <NavBar v-if="logged"/>
    </v-main>
  </v-app>
</template>
<style>
  *{
    font-family: 'Roboto', sans-serif !important;
  }
  :root {
    --color-one: white;
    --color-prime: #E65F5C;
  }  
.clean_float{
  clear: both;
} 
.divider_title{
  margin-top: 30px;
} 
.blank_merge{
  margin-bottom:50px;
}
.spacing{
  padding: 10px 10px;
  max-width: 500px;
  margin: auto;
}
.fade__right {
    animation: fade_right 1s ease-in-out;
}

@keyframes fade_right{
 0%{
    transform:translateX(-120px);
 }
}
</style>
<script>
import NavBar from './components/Navbar/NavBar.vue'
export default {
    name: "App",
    components: { NavBar },
    data(){
        return {
            logged: false
        }
    },
    methods: {
        sessionRedirect() {
          if(!sessionStorage.getItem("is_logged")){
            this.$axios
                .get(`${this.$HOST}/v1/users`)
                .then((response) => {
                if (typeof response != "undefined") {
                  sessionStorage.setItem("is_logged",true);
                  this.$router.go();
                }
            });
          }else{
          this.logged = true;
          }
        }
    },
    mounted() {
        this.sessionRedirect();
    }
}
</script>
