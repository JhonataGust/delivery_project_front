<template>
  <v-app>
    <v-main>
      <router-view/>
      <NavBar v-if="logged"/>
    </v-main>
  </v-app>
</template>
<style>
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
            this.$axios.defaults.headers.common = { "Authorization": `bearer ${String(sessionStorage.getItem("token_user"))}` };
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
                    this.logged = true;
                    this.$router.push("/home");
                }
            });
        }
    },
    mounted() {
        this.sessionRedirect();
    }
}
</script>
