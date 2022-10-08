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
  }
.clean_float{
  clear: both;
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
            console.log(this.logged)
            this.$axios
                .get(`${this.$HOST}/v1/users`)
                .catch((error) => {
                if (error) {
                    this.$router.push("/login");
                }
                else {
                    this.$router.push("/home");
                }
            })
                .then((response) => {
                if (typeof response != "undefined") {
                  sessionStorage.setItem("is_logged",true);
                  this.$router.push("/home");
                }
            });
        }
    },
    mounted() {
        if(!sessionStorage.getItem("is_logged")){
          this.sessionRedirect();
        }else{
          this.logged = true;
        }
    }
}
</script>
